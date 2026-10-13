// Notion -> Discord: gửi thông báo cho mỗi task mới trong database "UniEvent Tasks".
// Chạy bằng GitHub Actions (xem .github/workflows/notion-discord.yml). Node >= 18, không cần package ngoài.
//
// Biến môi trường (đặt trong GitHub Secrets):
//   NOTION_TOKEN         Internal integration secret (ntn_...), integration phải được "Connect" vào trang UniEvent - T07
//   NOTION_DATABASE_ID   ID của database UniEvent Tasks
//   DISCORD_WEBHOOK_URL  Webhook của kênh #task-updates
//   DISCORD_MENTIONS     (tuỳ chọn) JSON map Owner -> Discord user ID, ví dụ {"Huy":"123456789012345678"}
//
// Cách chống gửi trùng: sau khi gửi thành công, script tick ô "Discord Notified" trên task.
// Muốn gửi lại một task thì bỏ tick ô đó.

const NOTION_VERSION = "2022-06-28";
const GRACE_MS = 2 * 60 * 1000; // bỏ qua task vừa tạo < 2 phút (người tạo còn đang gõ)

const { NOTION_TOKEN, NOTION_DATABASE_ID, DISCORD_WEBHOOK_URL } = process.env;
const DRY_RUN = process.env.DRY_RUN === "1";
let MENTIONS = {};
try {
  MENTIONS = JSON.parse(process.env.DISCORD_MENTIONS || "{}");
} catch {
  console.warn("DISCORD_MENTIONS không phải JSON hợp lệ, bỏ qua mention.");
}

for (const [k, v] of Object.entries({ NOTION_TOKEN, NOTION_DATABASE_ID, DISCORD_WEBHOOK_URL })) {
  if (!v && !(DRY_RUN && k === "DISCORD_WEBHOOK_URL")) {
    console.error(`Thiếu biến môi trường ${k}`);
    process.exit(1);
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function notion(path, method = "GET", body) {
  for (let attempt = 0; attempt < 5; attempt++) {
    const res = await fetch(`https://api.notion.com/v1/${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${NOTION_TOKEN}`,
        "Notion-Version": NOTION_VERSION,
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (res.status === 429) {
      await sleep((Number(res.headers.get("retry-after")) || 1) * 1000);
      continue;
    }
    const json = await res.json();
    if (!res.ok) throw new Error(`Notion ${method} ${path}: ${res.status} ${json.message}`);
    return json;
  }
  throw new Error("Notion rate limit, thử lại sau.");
}

async function discord(payload) {
  if (DRY_RUN) {
    console.log("[DRY_RUN]", JSON.stringify(payload, null, 2));
    return;
  }
  const url = DISCORD_WEBHOOK_URL + (DISCORD_WEBHOOK_URL.includes("?") ? "&" : "?") + "wait=true";
  for (let attempt = 0; attempt < 5; attempt++) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.status === 429) {
      const j = await res.json().catch(() => ({}));
      await sleep(((j.retry_after ?? 1) * 1000) + 250);
      continue;
    }
    if (!res.ok) throw new Error(`Discord webhook: ${res.status} ${await res.text()}`);
    return;
  }
  throw new Error("Discord rate limit, thử lại sau.");
}

// ---- đọc property Notion thành chuỗi ----
function text(prop) {
  if (!prop) return "";
  switch (prop.type) {
    case "title":
    case "rich_text":
      return prop[prop.type].map((t) => t.plain_text).join("").trim();
    case "select":
    case "status":
      return prop[prop.type]?.name ?? "";
    case "multi_select":
      return prop.multi_select.map((o) => o.name).join(", ");
    case "people":
      return prop.people.map((p) => p.name ?? "").filter(Boolean).join(", ");
    case "date": {
      const d = prop.date;
      if (!d) return "";
      return d.end ? `${d.start} → ${d.end}` : d.start;
    }
    case "url":
      return prop.url ?? "";
    case "unique_id":
      return prop.unique_id?.number != null
        ? `${prop.unique_id.prefix ? prop.unique_id.prefix + "-" : ""}${prop.unique_id.number}`
        : "";
    case "checkbox":
      return prop.checkbox ? "✅" : "";
    default:
      return "";
  }
}

const PRIORITY_COLOR = { High: 0xed4245, Medium: 0xfee75c, Low: 0x99aab5 };

function toDate(s) {
  // "2026-10-20" -> "<t:...:D>" để Discord hiển thị theo múi giờ người xem
  const t = Date.parse(s.length === 10 ? `${s}T00:00:00+07:00` : s);
  return Number.isNaN(t) ? s : `<t:${Math.floor(t / 1000)}:D>`;
}

function buildMessage(page) {
  const p = page.properties;
  const title = text(p["Task"]) || "(chưa có tên)";
  const id = text(p["ID"]);
  const owner = text(p["Owner"]);
  const due = p["Due"]?.date?.start;
  const fields = [
    ["👤 Owner", owner],
    ["🙋 Assignee", text(p["Assignee"])],
    ["📌 Status", text(p["Status"])],
    ["⚡ Priority", text(p["Priority"])],
    ["📅 Due", due ? toDate(due) : ""],
    ["📄 PA", text(p["PA"])],
    ["🏷️ Type", text(p["Type"])],
    ["📦 Work Package", text(p["Work Package"])],
    ["🔗 GitHub", text(p["GitHub"])],
  ]
    .filter(([, v]) => v)
    .map(([name, value]) => ({ name, value: value.slice(0, 1024), inline: name !== "📦 Work Package" && name !== "🔗 GitHub" }));

  const mentionIds = owner === "Cả nhóm" ? Object.values(MENTIONS) : [MENTIONS[owner]].filter(Boolean);
  return {
    username: "Notion Tasks",
    content: mentionIds.length ? mentionIds.map((u) => `<@${u}>`).join(" ") + " có task mới!" : undefined,
    allowed_mentions: { parse: [], users: mentionIds },
    embeds: [
      {
        title: `🆕 ${id ? `[${id}] ` : ""}${title}`.slice(0, 256),
        url: page.url,
        color: PRIORITY_COLOR[text(p["Priority"])] ?? 0x5865f2,
        fields,
        footer: { text: "Notion • UniEvent Tasks" },
        timestamp: page.created_time,
      },
    ],
  };
}

async function main() {
  const pages = [];
  let cursor;
  do {
    const res = await notion(`databases/${NOTION_DATABASE_ID}/query`, "POST", {
      filter: { property: "Discord Notified", checkbox: { equals: false } },
      sorts: [{ timestamp: "created_time", direction: "ascending" }],
      page_size: 100,
      start_cursor: cursor,
    });
    pages.push(...res.results);
    cursor = res.has_more ? res.next_cursor : undefined;
  } while (cursor);

  const now = Date.now();
  let sent = 0;
  for (const page of pages) {
    if (page.archived || page.in_trash) continue;
    if (now - Date.parse(page.created_time) < GRACE_MS) continue; // đợi lần chạy sau
    if (!text(page.properties["Task"])) continue; // chưa đặt tên thì chưa gửi

    await discord(buildMessage(page));
    if (!DRY_RUN) {
      await notion(`pages/${page.id}`, "PATCH", { properties: { "Discord Notified": { checkbox: true } } });
    }
    sent++;
    await sleep(500);
  }
  console.log(`Đã kiểm tra ${pages.length} task chưa thông báo, gửi ${sent}.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
