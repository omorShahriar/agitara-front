"use client";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { TypographyP } from "@/components/Typography";
const LoginPage = () => {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const callbackUrl = searchParams.get("callbackUrl");
  const email = useRef("");
  const pass = useRef("");

  const onSubmit = async () => {
    if (!email.current || !pass.current) {
      return null;
    }
    setLoading(true);
    await signIn("credentials", {
      email: email.current,
      password: pass.current,
      redirect: true,
      callbackUrl,
    }).then((result) => setLoading(false));
  };
  return (
    <div className="container">
      <div
        className={"flex flex-col justify-center items-center  h-screen gap-1"}
      >
        <div className="mb-8 min-h-[40px]">
          <Image src="/logo.png" width={200} height={120} alt="agitara logo" />
        </div>
        <div className=" flex flex-col gap-4 lg:w-2/4 md:w-3/4 w-full">
          <div className="flex flex-col gap-y-2 ">
            {" "}
            <Label htmlFor="email">Email:</Label>
            <Input
              id="email"
              type="email"
              onChange={(e) => (email.current = e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-y-2 ">
            <Label htmlFor="password">Password:</Label>
            <Input
              id="password"
              type={"password"}
              onChange={(e) => (pass.current = e.target.value)}
            />
          </div>

          <Button
            className="p-2 bg-black text-white text-xl rounded-lg mt-4"
            onClick={onSubmit}
            disabled={loading}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Login
          </Button>
        </div>
        <div className="mt-4 text-center">
          <p>
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className=" underline  ">
              Sign up
            </Link>
          </p>
          <p>
            Return to{" "}
            <Link
              className=" hover:underline transition-all duration-200 "
              href="/"
            >
              {" "}
              homepage{" "}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
