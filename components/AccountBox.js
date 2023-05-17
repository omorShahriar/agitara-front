import Link from "next/link";
import { UserNav } from "./shared/UserNav";
import { Button } from "./ui/button";
const AccountBox = ({ session }) => {
  console.log(session);
  return (
    <>
      {session ? (
        <div className="mt-2">
          <UserNav userData={session.user} />
        </div>
      ) : (
        <Button asChild>
          <Link href="/api/auth/signin">Sign in</Link>
        </Button>
      )}
    </>
  );
};

export default AccountBox;
