import styles from "@share/ui/Date/styles.module.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

type Props = {
  timestamp: number;
};

export default function Date({ timestamp }: Props) {
  dayjs.extend(relativeTime);
  return <p className={styles.date}>{dayjs(timestamp).fromNow()}</p>;
}
