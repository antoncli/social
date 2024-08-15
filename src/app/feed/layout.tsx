import UsersDropDown from "@share/components/UsersDropDown/UserDropDown";
import Header from "@share/components/Header/Header";
import styles from "@app/feed/styles.module.css";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header pageName='Feed' centerChild={<UsersDropDown />} />
      <div className={styles.content}>{children}</div>
    </>
  );
}
