import { UserIcon } from "@share/ui/UserIcon/UserIcon";
import styles from "@share/ui/SmallUserCard/styles.module.css";
import Date from "@share/ui/Date/Date";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import BoardsFactory from "@/app/feed/classes/BoardsFactory";
import { BoardName } from "@/app/feed/enums/BoardName";
import { addBoard } from "@/store/features/boardsSlice/boardSlice";

type Props = {
  name: string;
  timestamp?: number;
};

export default function SmallUserCard({ name, timestamp }: Props) {
  const dispatch = useDispatch();

  const hundleClick = useCallback(() => {
    dispatch(addBoard(BoardsFactory.get(BoardName.user, { name })));
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
