"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import styles from "@/app/feed/boards/styles.module.css";
import Board from "@/app/feed/boards/Board/Board";
import People from "@/app/feed/boards/People/People";
import { removeBoard } from "@/store/features/boardsSlice/boardSlice";
import { BoardName } from "@/app/feed/enums/BoardName";
import User from "@/app/feed/boards//User/User";

export default function Boards() {
  const dispatch = useAppDispatch();
  const people = useAppSelector((state) => state.boards.people);
  const user = useAppSelector((state) => state.boards.user);

  const onCloseClick = (name: BoardName, id: number) => {
    dispatch(removeBoard({ name, id }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.boards}>
        {people.map((board) => {
          return (
            <Board key={board.id} onCloseClick={() => onCloseClick(board.name, board.id)}>
              <People input={board.props.input} />
            </Board>
          );
        })}
        {user.map((board) => {
          return (
            <Board key={board.id} onCloseClick={() => onCloseClick(board.name, board.id)}>
              <User user={board.props.user} />
            </Board>
          );
        })}
      </div>
    </div>
  );
}
