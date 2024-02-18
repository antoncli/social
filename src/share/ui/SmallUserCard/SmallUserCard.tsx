import { UserIcon } from "@share/ui/UserIcon/UserIcon";
import styles from "@share/ui/SmallUserCard/styles.module.css";

type Props = {
  name: string;
};

export default function SmallUserCard({ name }: Props) {
  return (
    <div className={styles.user}>
      <UserIcon name={name}></UserIcon>
      <label className={styles.label}>{name}</label>
    </div>
  );
}
