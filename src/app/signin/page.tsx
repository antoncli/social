"use client";

import React from "react";
import styles from "@/app/signin/styles.module.css";
import Input from "@/share/ui/Input/Input";
import Button from "@/share/ui/Button/Button";
import Link from "@/share/ui/Link/Link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { printFetchError } from "@/share/helpers/printFetchError";

export default function SignIn() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const onSignin = async () => {
    try {
      const response = await axios.post("/api/users/signin", user);
      if (response.status === 200) router.push("/feed");
    } catch (error) {
      printFetchError(error);
    }
  };

  return (
    <div className={`${styles.container} center column ${styles.gap4}`}>
      <label>Sign in</label>
      <Input type='email' placeholder='Email' onChange={(e) => setUser({ ...user, email: e.target.value })} />
      <Input type='password' placeholder='Password' onChange={(e) => setUser({ ...user, password: e.target.value })} />
      <br />
      <Button text='Sign in' onClick={onSignin} />
      <Link href='/signup' text='Visit Sign up page' />
    </div>
  );
}
