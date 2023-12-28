import { TSafeUserSchema } from "@/schemas/safe/SafeUserSchema";
import { getAvatarColorByString } from "@/share/helpers/getAvatarColorByString";
import styles from "@/share/ui/SmallUserCard/styles.module.css";

type Props = {
  user: TSafeUserSchema;
};

export default function SmallUserCard({ user }: Props) {
  return (
    <div className={styles.container}>
      <div
        className={styles.avatarContainer}
        style={{ backgroundColor: getAvatarColorByString(`${user.name.at(0)}${user.name.at(-1)}`) }}
      >
        {user.name.charAt(0).toUpperCase()}
      </div>
      <label className={styles.label}>{user.name}</label>
    </div>
  );
}
