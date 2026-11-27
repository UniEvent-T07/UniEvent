"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import type { RoleAssignment } from "../role-assignment";

type DevUser = {
  id: string;
  code: string;
  displayName: string;
  roles: RoleAssignment[];
};

type UsersState =
  | { status: "loading" }
  | { status: "ready"; users: DevUser[] }
  | { status: "error"; message: string };

export default function DevLoginForm() {
  const router = useRouter();
  const [state, setState] = useState<UsersState>({ status: "loading" });
  const [userCode, setUserCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadUsers() {
      try {
        const response = await fetch("/api/dev/users", { signal: controller.signal });
        if (response.status === 404 || response.status === 403) {
          setState({ status: "error", message: "Đăng nhập thử hiện không được bật." });
          return;
        }

        if (!response.ok) {
          throw new Error();
        }

        const users: DevUser[] = await response.json();
        setState({ status: "ready", users });
      } catch {
        if (!controller.signal.aborted) {
          setState({
            status: "error",
            message: "Không thể tải danh sách tài khoản mẫu. Vui lòng tải lại trang.",
          });
        }
      }
    }

    void loadUsers();
    return () => controller.abort();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!userCode || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/dev/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userCode }),
      });
      if (!response.ok) throw new Error();

      router.replace("/me");
    } catch {
      setSubmitError("Không thể đăng nhập. Vui lòng thử lại.");
      setIsSubmitting(false);
    }
  }

  if (state.status === "loading") {
    return <p role="status">Đang tải danh sách tài khoản mẫu…</p>;
  }

  if (state.status === "error") {
    return <p className="error-message" role="alert">{state.message}</p>;
  }

  if (state.users.length === 0) {
    return <p>Chưa có tài khoản mẫu để đăng nhập.</p>;
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <label htmlFor="user-code">Tài khoản mẫu</label>
      <select
        id="user-code"
        name="userCode"
        required
        value={userCode}
        disabled={isSubmitting}
        onChange={(event) => setUserCode(event.target.value)}
      >
        <option value="" disabled>Chọn tài khoản</option>
        {state.users.map((user) => (
          <option key={user.id} value={user.code}>
            {user.displayName} ({user.code})
          </option>
        ))}
      </select>
      <button type="submit" disabled={isSubmitting || !userCode}>Đăng nhập</button>
      {isSubmitting && <p role="status">Đang đăng nhập…</p>}
      {submitError && <p className="error-message" role="alert">{submitError}</p>}
    </form>
  );
}
