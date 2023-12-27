"use client";

import React from "react";
import styles from "@/app/signup/styles.module.css";
import Input from "@/share/ui/Input/Input";
import Button from "@/share/ui/Button/Button";
import Link from "@/share/ui/Link/Link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { printFetchError } from "@/share/helpers/printFetchError";

export default function SignUp() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    repeatPassword: "",
    name: "",
  });

  const onSignup = async () => {
    try {
      if (user.password !== user.repeatPassword) {
        console.error("passwords do not match");
      }

      const responce = await axios.post("/api/users/signup", user);
      if (responce.status === 201) router.push("/feed");
    } catch (error) {
      printFetchError(error);
    }
  };

  return (
    <div className={`${styles.container} center column ${styles.gap}`}>
      <label>Sign up</label>
      <Input placeholder='Name' onChange={(e) => setUser({ ...user, name: e.target.value })} />
      <Input type='email' placeholder='Login' onChange={(e) => setUser({ ...user, email: e.target.value })} />
      <Input type='password' placeholder='Password' onChange={(e) => setUser({ ...user, password: e.target.value })} />
      <Input
        type='password'
        placeholder='Repeat password'
        onChange={(e) => setUser({ ...user, repeatPassword: e.target.value })}
      />
      <br />
      <Button text='Sign up' onClick={onSignup} />
      <Link href='/signin' text='Visit Sign in page' />
    </div>
  );
}
