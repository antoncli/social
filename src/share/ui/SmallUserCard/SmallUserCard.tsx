import styles from "@/share/ui/SmallUserCard/styles.module.css";
import { UserIcon } from "../UserIcon/UserIcon";
import { MouseEventHandler } from "react";
import { User } from "@/schemas/UserSchema";

type Props = {
  user: User;
  onClick?: MouseEventHandler<HTMLDivElement>;
};

export default function SmallUserCard({ user, onClick }: Props) {
  return (
    <div className={styles.container} onClick={onClick}>
      <UserIcon name={user.name} />
      <label className={styles.label}>{user.name}</label>
    </div>
  );
}
