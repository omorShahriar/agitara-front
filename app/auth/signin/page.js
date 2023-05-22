"use client";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const LoginPage = () => {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const callbackUrl = searchParams.get("callbackUrl");
  const email = useRef("");
  const pass = useRef("");
  const router = useRouter();
  const onSubmit = async () => {
    if (!email.current || !pass.current) {
      return null;
    }
    try {
      setLoading(true);
      await signIn("credentials", {
        email: email.current,
        password: pass.current,
        redirect: false,
      }).then(({ ok, error }) => {
        if (ok) {
          router.push(callbackUrl);
        }
        if (error) {
          setErrorMessage(error);
        }

        setLoading(false);
      });
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  return (
    <div className="container">
      <div
        className={"flex h-screen flex-col items-center  justify-center gap-1"}
      >
        <div className="mb-8 min-h-[40px]">
          <Image src="/logo.png" width={200} height={120} alt="agitara logo" />
        </div>
        {errorMessage && (
          <div className="mb-4">
            <p className="text-center text-sm text-red-600">{errorMessage}</p>
          </div>
        )}
        <form className=" flex w-full flex-col gap-4 md:w-3/4 lg:w-2/4">
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
            className="mt-4 rounded-lg bg-black p-2 text-xl text-white"
            onClick={onSubmit}
            disabled={loading}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Login
          </Button>
        </form>

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
              className=" transition-all duration-200 hover:underline "
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
