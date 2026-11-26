import { notFound } from "next/navigation";
import DevLoginForm from "./dev-login-form";

export default function DevLoginPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return (
    <>
      <h1>Đăng nhập thử</h1>
      <div className="panel account-panel">
        <DevLoginForm />
      </div>
    </>
  );
}
