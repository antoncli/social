import { UserIcon } from "@/share/ui/UserIcon/UserIcon";
import styles from "@/share/ui/UserIconButton/styles.module.css";
import { MouseEventHandler } from "react";

type Props = {
  name: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export default function UserIconButton({ name, onClick }: Props) {
  return (
    <button className={styles.button} onClick={onClick}>
      <UserIcon name={name} />
    </button>
  );
}
