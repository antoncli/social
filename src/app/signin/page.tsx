"use client";

import React from "react";
import styles from "@/app/signin/styles.module.css";
import Input from "@/share/ui/Input/Input";
import Button from "@/share/ui/Button/Button";
import Link from "@/share/ui/Link/Link";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";
import { SignIn as ISignIn } from "@/services/interfaces/signin";
import { handlePromiseError } from "@/share/helpers/handlePromiesError";

export default function SignIn() {
  const router = useRouter();
  const [user, setUser] = React.useState<ISignIn>({
    email: "",
    password: "",
  });

  const onSignin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handlePromiseError(authService.signin, [user], (response) => {
      if (response.status === 200) router.push("/feed");
    });
  };

  return (
    <div className={`${styles.container} center column ${styles.gap4}`}>
      <form className={`center column ${styles.gap4}`} onSubmit={onSignin}>
        <label>Sign in</label>
        <Input placeholder='Email' onChange={(e) => setUser({ ...user, email: e.target.value })} />
        <Input type='password' placeholder='Password' onChange={(e) => setUser({ ...user, password: e.target.value })} />
        <br />
        <Button type='submit' text='Sign in' />
      </form>
      <Link href='/signup' text='Visit Sign up page' />
    </div>
  );
}
