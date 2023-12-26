"use client";

import styles from "@/share/components/Header/styles.module.css";
import Button from "@/share/ui/Button/Button";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

type Props = {
  pageName: string;
};

export default function Header({ pageName }: Props) {
  const router = useRouter();

  const signOut = async () => {
    try {
      const response = await axios.post("/api/users/signout");
      if (response.status === 200) router.push("/signin");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error.response?.data);
        return;
      }
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>{pageName}</label>
      <Button text='Sign out' onClick={signOut} />
    </div>
  );
}
