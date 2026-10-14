// GitHub Issues -> Discord: gửi thông báo vào #task-updates khi có task (issue) mới hoặc khi task được giao cho ai đó.
// Chạy bằng GitHub Actions (xem .github/workflows/issue-discord.yml). Node >= 18, không cần package ngoài.
//
// Biến môi trường:
//   DISCORD_WEBHOOK_URL  Webhook của kênh #task-updates
//   DISCORD_MENTIONS     (tuỳ chọn) JSON map Tên -> Discord user ID, ví dụ {"Huy":"123456789012345678"}
//   GITHUB_EVENT_NAME, GITHUB_EVENT_PATH  do GitHub Actions cung cấp
//   DRY_RUN=1            chỉ in payload, không gửi
//
// Tên thành viên lấy từ .github/team.json (GitHub username -> tên).

import { readFileSync } from "node:fs";

const { DISCORD_WEBHOOK_URL, GITHUB_EVENT_PATH } = process.env;
const DRY_RUN = process.env.DRY_RUN === "1";

if (!GITHUB_EVENT_PATH) {
  console.error("Thiếu GITHUB_EVENT_PATH (script này chạy trong GitHub Actions).");
  process.exit(1);
}
if (!DISCORD_WEBHOOK_URL && !DRY_RUN) {
  console.error("Thiếu biến môi trường DISCORD_WEBHOOK_URL");
  process.exit(1);
}

let MENTIONS = {};
try {
  MENTIONS = JSON.parse(process.env.DISCORD_MENTIONS || "{}");
} catch {
  console.warn("DISCORD_MENTIONS không phải JSON hợp lệ, bỏ qua mention.");
}

let TEAM = {};
try {
  TEAM = JSON.parse(readFileSync(new URL("../team.json", import.meta.url), "utf8"));
} catch {
  console.warn("Không đọc được .github/team.json, hiển thị username GitHub.");
}

const event = JSON.parse(readFileSync(GITHUB_EVENT_PATH, "utf8"));
const { action, issue } = event;
if (!issue || issue.pull_request) process.exit(0);

// Issue tạo kèm người được giao sẽ phát cả "opened" lẫn "assigned": chỉ gửi một lần (ở "opened").
if (action === "assigned") {
  const ageMs = Date.now() - new Date(issue.created_at).getTime();
  if (ageMs < 60 * 1000) {
    console.log("Bỏ qua sự kiện assigned ngay sau khi tạo issue.");
    process.exit(0);
  }
}

const nameOf = (login) => TEAM[login] || login;
const mentionOf = (login) => {
  const id = MENTIONS[nameOf(login)];
  return id ? `<@${id}>` : null;
};

const assignees = action === "assigned" && event.assignee ? [event.assignee] : issue.assignees || [];
const labels = (issue.labels || []).map((l) => l.name);
const prio = labels.find((l) => l.startsWith("priority:"))?.split(":")[1].trim();
const COLORS = { high: 0xe03131, medium: 0xf59f00, low: 0x868e96 };

const assigneeText = assignees.length
  ? assignees.map((a) => `${nameOf(a.login)}${mentionOf(a.login) ? ` (${mentionOf(a.login)})` : ""}`).join(", ")
  : "Chưa giao";

const fields = [
  ["🙋 Người làm", assigneeText, false],
  ["✍️ Người tạo", nameOf(issue.user.login), true],
  ["🏷️ Nhãn", labels.length ? labels.join(", ") : "—", true],
];
if (issue.milestone) fields.push(["🎯 Milestone", issue.milestone.title, true]);

const body = (issue.body || "").replace(/\r/g, "").trim();
const description = body.length > 350 ? `${body.slice(0, 350)}…` : body;

const ids = [...new Set(assignees.map((a) => MENTIONS[nameOf(a.login)]).filter(Boolean))];
const intro =
  action === "assigned"
    ? `${ids.map((id) => `<@${id}>`).join(" ") || nameOf(event.assignee.login)} được giao task!`
    : `${ids.map((id) => `<@${id}>`).join(" ")} có task mới!`.trim();

const payload = {
  username: "GitHub Tasks",
  content: intro,
  allowed_mentions: { users: ids },
  embeds: [
    {
      title: `#${issue.number} ${issue.title}`.slice(0, 256),
      url: issue.html_url,
      description: description || undefined,
      color: COLORS[prio] ?? 0x5865f2,
      fields: fields.map(([name, value, inline]) => ({ name, value: String(value).slice(0, 1024), inline })),
      footer: { text: "GitHub Project • Team Management" },
      timestamp: issue.created_at,
    },
  ],
};

if (DRY_RUN) {
  console.log(JSON.stringify(payload, null, 2));
  process.exit(0);
}

for (let attempt = 0; attempt < 3; attempt++) {
  const res = await fetch(`${DISCORD_WEBHOOK_URL}?wait=true`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (res.status === 429) {
    const retry = Number((await res.json().catch(() => ({}))).retry_after ?? 2);
    await new Promise((r) => setTimeout(r, retry * 1000));
    continue;
  }
  if (!res.ok) {
    console.error(`Discord ${res.status}: ${await res.text()}`);
    process.exit(1);
  }
  console.log(`Đã gửi #${issue.number} (${action}) vào Discord.`);
  process.exit(0);
}
console.error("Discord rate limit, không gửi được.");
process.exit(1);
