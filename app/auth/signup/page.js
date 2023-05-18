"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { useToast } from "@/components/ui/use-toast";
import { TypographyLead } from "@/components/Typography";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();
  async function handleRegister() {
    const registerInfo = {
      username: username,
      email: email,
      password: password,
    };
    try {
      const register = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/auth/local/register`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registerInfo),
        }
      );
      const registerResponse = await register.json();
      if (registerResponse) {
        setUsername("");
        setEmail("");
        setPassword("");
        setSuccess(true);
      }
    } catch (error) {
      setUsername("");
      setEmail("");
      setPassword("");
      toast({
        title: "Something went wrong ",
        description: "There might be a network issue.",
      });
    }
  }
  return (
    <div className="container">
      {" "}
      <div
        className={"flex flex-col justify-center items-center  h-screen gap-1"}
      >
        <div className="mb-8 min-h-[40px]">
          <Image src="/logo.png" width={200} height={120} alt="agitara logo" />
        </div>
        {success ? (
          <div>
            <TypographyLead>
              Please check your mail for confirmation link
            </TypographyLead>
          </div>
        ) : (
          <div className=" flex flex-col gap-4 lg:w-2/4 md:w-3/4 w-full">
            <div className="flex flex-col gap-y-2 ">
              {" "}
              <Label htmlFor="userName">User Name:</Label>
              <Input
                id="userName"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-y-2 ">
              {" "}
              <Label htmlFor="email">Email:</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-y-2 ">
              <Label htmlFor="password">Password:</Label>
              <Input
                id="password"
                type={"password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button onClick={handleRegister}>Sign Up</Button>
          </div>
        )}
        <div className="mt-4">
          <p>
            Already have an account?{" "}
            <Link href="/auth/signin" className=" underline  ">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
