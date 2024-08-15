import BoardId from "@/app/feed/classes/BoardId";
import { useAppDispatch } from "@/store/hooks";
import { User } from "@/schemas/UserSchema";
import { TSafeUserSchema } from "@/schemas/safe/SafeUserSchema";
import styles from "@/share/components/UsersPopupList/styles.module.css";
import UserCard from "@/share/ui/UserCard/UserCard";
import { LegacyRef, MouseEventHandler } from "react";
import BoardsFactory from "@/app/feed/classes/BoardsFactory";
import { BoardName } from "@/app/feed/enums/BoardName";
import { addBoard } from "@/store/features/boardsSlice/boardSlice";

type Props = {
  users: TSafeUserSchema[];
  width?: string;
  maxHeight?: string;
  innerRef?: LegacyRef<HTMLDivElement>;
  onShowAllClick?: MouseEventHandler<HTMLButtonElement>;
};

export default function UsersPopupList({ users, width = "20vw", maxHeight, innerRef, onShowAllClick }: Props) {
  const dispatch = useAppDispatch();

  const handleUserClick = (user: User) => {
    dispatch(addBoard(BoardsFactory.get(BoardName.user, { name: user.name })));
  };

  return (
    <div ref={innerRef} className={styles.container} style={{ width, maxHeight }}>
      <div className={styles.list}>
        {users.map((user) => {
          return <UserCard key={user.name} user={user} onClick={() => handleUserClick(user)} />;
        })}
      </div>
      <button className={styles.button} onClick={onShowAllClick}>
        Show all
      </button>
    </div>
  );
}
