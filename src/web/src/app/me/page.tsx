import AccountSession from "./account-session";

export default function MePage() {
  return (
    <>
      <h1>Tài khoản</h1>
      <div className="panel account-panel">
        <AccountSession />
      </div>
    </>
  );
}
