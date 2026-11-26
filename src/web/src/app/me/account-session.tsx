"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { roleLabels, scopeLabels } from "../role-assignment";
import type { RoleAssignment } from "../role-assignment";

type Session = {
  id: string;
  displayName: string;
  roles: RoleAssignment[];
};

type SessionState =
  | { status: "loading" | "signed-out" | "error" }
  | { status: "ready"; session: Session };

export default function AccountSession() {
  const router = useRouter();
  const [state, setState] = useState<SessionState>({ status: "loading" });
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [signOutError, setSignOutError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadSession() {
      try {
        const response = await fetch("/api/auth/me", {
          cache: "no-store",
          signal: controller.signal,
        });
        if (response.status === 401) {
          setState({ status: "signed-out" });
          return;
        }

        if (!response.ok) {
          throw new Error();
        }

        const session: Session = await response.json();
        setState({ status: "ready", session });
      } catch {
        if (!controller.signal.aborted) {
          setState({ status: "error" });
        }
      }
    }

    void loadSession();
    return () => controller.abort();
  }, []);

  async function handleSignOut() {
    if (isSigningOut) return;

    setIsSigningOut(true);
    setSignOutError(false);

    try {
      const response = await fetch("/api/auth/logout", { method: "POST" });
      if (!response.ok && response.status !== 401) throw new Error();

      setState({ status: "signed-out" });
      router.replace("/");
    } catch {
      setSignOutError(true);
      setIsSigningOut(false);
    }
  }

  if (state.status !== "ready") {
    switch (state.status) {
      case "loading":
        return <p role="status">Đang tải thông tin tài khoản…</p>;
      case "signed-out":
        return (
          <div className="signed-out">
            <p>Bạn chưa đăng nhập.</p>
            {process.env.NODE_ENV !== "production" && (
              <Link href="/dev-login">Đăng nhập bằng tài khoản mẫu</Link>
            )}
          </div>
        );
      case "error":
        return (
          <p className="error-message" role="alert">
            Không thể tải thông tin tài khoản. Vui lòng tải lại trang.
          </p>
        );
    }
  }

  const { displayName, roles } = state.session;
  return (
    <div className="account-details">
      <h2>{displayName}</h2>
      <section aria-labelledby="account-roles">
        <h3 id="account-roles">Quyền được cấp</h3>
        {roles.length === 0 ? (
          <p>Tài khoản này chưa được cấp quyền.</p>
        ) : (
          <ul className="role-list">
            {roles.map(({ role, scopeType, scopeId }) => (
              <li key={JSON.stringify([role, scopeType, scopeId])}>
                <strong>{roleLabels[role]}</strong>
                <span>{scopeType && scopeId ? `${scopeLabels[scopeType]} · ${scopeId}` : "Không giới hạn phạm vi"}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
      <button type="button" onClick={handleSignOut} disabled={isSigningOut}>Đăng xuất</button>
      {isSigningOut && <p role="status">Đang đăng xuất…</p>}
      {signOutError && <p className="error-message" role="alert">Không thể đăng xuất. Vui lòng thử lại.</p>}
    </div>
  );
}
