"use client";

import styles from "@/share/components/Header/styles.module.css";
import { printFetchError } from "@/share/helpers/printFetchError";
import Button from "@/share/ui/Button/Button";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

type Props = {
  pageName: string;
  centerChild?: JSX.Element;
};

export default function Header({ pageName, centerChild }: Props) {
  const router = useRouter();

  const signOut = async () => {
    try {
      const response = await axios.post("/api/users/signout");
      if (response.status === 200) router.push("/signin");
    } catch (error) {
      printFetchError(error);
    }
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>{pageName}</label>
      {centerChild}
      <Button text='Sign out' onClick={signOut} />
    </div>
  );
}
