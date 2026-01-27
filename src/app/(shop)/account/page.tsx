import { AccountGuard } from "@/features/auth/guards/AccountGuard";
import { LogoutButton } from "@/features/auth/LogoutButton";
import NeedPasswordReset from "./NeedPasswordReset";

export default function AccountPage() {
  return (
    <AccountGuard>
      <div className="container">
        <h1 className="font-display text-xl font-medium pb-2">Moje konto</h1>

        <NeedPasswordReset />

        <LogoutButton />
      </div>
    </AccountGuard>
  );
}
