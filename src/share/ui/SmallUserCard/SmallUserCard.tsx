import { UserIcon } from "@share/ui/UserIcon/UserIcon";
import styles from "@share/ui/SmallUserCard/styles.module.css";
import Date from "@share/ui/Date/Date";

type Props = {
  name: string;
  timestamp?: number;
};

export default function SmallUserCard({ name, timestamp }: Props) {
  return (
    <div className={styles.user}>
      <UserIcon name={name}></UserIcon>
      <div className={styles.info}>
        <label className={styles.label}>{name}</label>
        {timestamp != undefined && <Date timestamp={timestamp} />}
      </div>
    </div>
  );
}
