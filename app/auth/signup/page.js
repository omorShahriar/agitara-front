"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister() {
    const registerInfo = {
      username: username,
      email: email,
      password: password,
    };

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
    console.log(registerResponse);
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
