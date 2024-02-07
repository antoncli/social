"use client";

import { authService } from "@/services/authService";
import styles from "@/share/components/Header/styles.module.css";
import Button from "@/share/ui/Button/Button";
import { handlePromiseError } from "@/share/helpers/handlePromiesError";
import { useRouter } from "next/navigation";

type Props = {
  pageName: string;
  centerChild?: JSX.Element;
};

export default function Header({ pageName, centerChild }: Props) {
  const router = useRouter();

  const signOut = async () => {
    handlePromiseError(authService.signout, [], (response) => {
      if (response.status === 200) router.push("/signin");
    });
  };

  return (
    <div className={`${styles.container} ${styles.shadow}`}>
      <label className={styles.label}>{pageName}</label>
      {centerChild}
      <Button text='Sign out' onClick={signOut} />
    </div>
  );
}
