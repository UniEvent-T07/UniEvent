import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "UniEvent",
  description: "Danh sách sự kiện công khai của UniEvent",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <header className="site-header">
          <nav aria-label="Điều hướng chính" className="site-nav">
            <Link className="site-name" href="/">UniEvent</Link>
            <div className="nav-links">
              {process.env.NODE_ENV !== "production" && (
                <Link href="/dev-login">Đăng nhập thử</Link>
              )}
              <Link href="/me">Tài khoản</Link>
            </div>
          </nav>
        </header>
        <main className="page" id="main-content">{children}</main>
      </body>
    </html>
  );
}
