// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import DevLoginForm from "./dev-login-form";

const { replace } = vi.hoisted(() => ({ replace: vi.fn() }));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace }),
}));

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

it("loads fixture accounts and lets the user retry a failed sign-in", async () => {
  const user = {
    id: "user-organiser",
    code: "usr_organiser_club_a",
    displayName: "Người tổ chức CLB A",
    roles: [{ role: "ORGANISER", scopeType: "CLUB", scopeId: "org_club_a" }],
  };
  const fetchMock = vi.fn()
    .mockResolvedValueOnce(Response.json([user]))
    .mockResolvedValueOnce(new Response(null, { status: 500 }))
    .mockResolvedValueOnce(new Response(null, { status: 204 }));
  vi.stubGlobal("fetch", fetchMock);

  render(<DevLoginForm />);

  expect(screen.getByRole("status").textContent).toContain("Đang tải");
  const select = await screen.findByRole("combobox", { name: "Tài khoản mẫu" });
  expect(screen.getByRole("option", { name: /Người tổ chức CLB A/ })).toBeTruthy();
  fireEvent.change(select, { target: { value: user.code } });
  fireEvent.click(screen.getByRole("button", { name: "Đăng nhập" }));

  expect(fetchMock).toHaveBeenNthCalledWith(1, "/api/dev/users", {
    signal: expect.any(AbortSignal),
  });
  expect(fetchMock).toHaveBeenNthCalledWith(2, "/api/dev/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userCode: user.code }),
  });
  expect((await screen.findByRole("alert")).textContent).toContain("Không thể đăng nhập");
  expect(replace).not.toHaveBeenCalled();

  fireEvent.click(screen.getByRole("button", { name: "Đăng nhập" }));

  expect(screen.queryByRole("alert")).toBeNull();
  await waitFor(() => expect(replace).toHaveBeenCalledWith("/me"));
});
