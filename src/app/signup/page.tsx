"use client";

import React from "react";
import styles from "@/app/signup/styles.module.css";
import Input from "@/share/ui/Input/Input";
import Button from "@/share/ui/Button/Button";
import Link from "@/share/ui/Link/Link";
import { useRouter } from "next/navigation";
import { handlePromiseError } from "@/share/helpers/handlePromiesError";
import { authService } from "@/services/authService";
import { SignUp } from "@/services/interfaces/signup";

export default function SignUp() {
  const router = useRouter();
  const [user, setUser] = React.useState<SignUp>({
    email: "",
    password: "",
    repeatPassword: "",
    name: "",
  });

  const onSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user.password !== user.repeatPassword) {
      console.error("passwords do not match");
      return;
    }

    handlePromiseError(authService.signup, [user], (responce) => {
      if (responce.status === 201) router.push("/feed");
    });
  };

  return (
    <div className={`${styles.container} center column ${styles.gap}`}>
      <form className={`center column ${styles.gap}`} onSubmit={onSignup}>
        <label>Sign up</label>
        <Input placeholder='Name' onChange={(e) => setUser({ ...user, name: e.target.value })} />
        <Input placeholder='Login' onChange={(e) => setUser({ ...user, email: e.target.value })} />
        <Input type='password' placeholder='Password' onChange={(e) => setUser({ ...user, password: e.target.value })} />
        <Input
          type='password'
          placeholder='Repeat password'
          onChange={(e) => setUser({ ...user, repeatPassword: e.target.value })}
        />
        <br />
        <Button type='submit' text='Sign up' />
      </form>
      <Link href='/signin' text='Visit Sign in page' />
    </div>
  );
}
