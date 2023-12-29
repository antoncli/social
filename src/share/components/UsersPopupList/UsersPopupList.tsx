import { TSafeUserSchema } from "@/schemas/safe/SafeUserSchema";
import styles from "@/share/components/UsersPopupList/styles.module.css";
import SmallUserCard from "@/share/ui/SmallUserCard/SmallUserCard";
import { LegacyRef, MouseEventHandler } from "react";

type Props = {
  users: TSafeUserSchema[];
  width?: string;
  maxHeight?: string;
  innerRef?: LegacyRef<HTMLDivElement>;
  onShowAllClick?: MouseEventHandler<HTMLButtonElement>;
};

export default function UsersPopupList({ users, width = "20vw", maxHeight, innerRef, onShowAllClick }: Props) {
  return (
    <div ref={innerRef} className={styles.container} style={{ width, maxHeight }}>
      <div className={styles.list}>
        <div>
          {users.map((user) => {
            return <SmallUserCard key={user.name} user={user} />;
          })}
        </div>
      </div>
      <button className={styles.button} onClick={onShowAllClick}>
        Show all
      </button>
    </div>
  );
}
