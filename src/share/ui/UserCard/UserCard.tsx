import styles from "@/share/ui/UserCard/styles.module.css";
import { UserIcon } from "../UserIcon/UserIcon";
import { MouseEventHandler } from "react";
import { User } from "@/schemas/UserSchema";

type Props = {
  user: User;
  onClick?: MouseEventHandler<HTMLDivElement>;
};

export default function UserCard({ user, onClick }: Props) {
  return (
    <div className={styles.container} onClick={onClick}>
      <UserIcon name={user.name} />
      <label className={styles.label}>{user.name}</label>
    </div>
  );
}
