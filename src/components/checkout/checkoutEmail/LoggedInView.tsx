import { Button } from "@/components/ui/button/Button";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

type Props = {
  email: string;
};

export function LoggedInView({ email }: Props) {
  const { logout } = useAuth();
  const router = useRouter();

  return (
    <p className="flex gap-2 items-center justify-between text-sm text-neutral-500 ml-11.5">
      {email}

      <Button
        size="xs"
        variant={"secondary"}
        onClick={async (e) => {
          e.preventDefault();
          router.push("/");
          await logout();
        }}
      >
        Wyloguj się
      </Button>
    </p>
  );
}
