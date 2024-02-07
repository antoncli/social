import { getAvatarColorByString } from "@/share/helpers/getAvatarColorByString";
import styles from "@/share/ui/UserIcon/styles.module.css";

type Props = {
  name: string;
};

export function UserIcon({ name }: Props) {
  return (
    <div className={styles.avatarContainer} style={{ backgroundColor: getAvatarColorByString(`${name.at(0)}${name.at(-1)}`) }}>
      {name.charAt(0).toUpperCase()}
    </div>
  );
}
