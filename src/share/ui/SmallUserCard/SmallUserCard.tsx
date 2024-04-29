import { UserIcon } from "@share/ui/UserIcon/UserIcon";
import styles from "@share/ui/SmallUserCard/styles.module.css";
import Date from "@share/ui/Date/Date";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { addUserBoard } from "@store/features/boardsSlice/boardSlice";
import BoardId from "@app/feed/classes/BoardId";

type Props = {
  name: string;
  timestamp?: number;
};

export default function SmallUserCard({ name, timestamp }: Props) {
  const dispatch = useDispatch();

  const hundleClick = useCallback(() => {
    dispatch(addUserBoard({ id: BoardId.id, props: { name } }));
  }, [name]);

  return (
    <div role='button' className={styles.user} onClick={hundleClick}>
      <UserIcon name={name}></UserIcon>
      <div className={styles.info}>
        <label className={styles.label}>{name}</label>
        {timestamp != undefined && <Date timestamp={timestamp} />}
      </div>
    </div>
  );
}
