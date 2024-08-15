"use client";

import { useAppDispatch, useAppSelector } from "@store/hooks";
import styles from "./styles.module.css";
import Board from "@app/feed/boards/Board/Board";
import { addBoard, removeBoard } from "@store/features/boardsSlice/boardSlice";
import { BoardName } from "@app/feed/enums/BoardName";
import { useEffect } from "react";
import BoardsFactory from "./classes/BoardsFactory";

export default function Feed() {
  const dispatch = useAppDispatch();
  const boards = useAppSelector((state) => state.boards.boards);

  useEffect(() => {
    dispatch(addBoard(BoardsFactory.get(BoardName.posts, {})));
  }, []);

  const onCloseClick = (id: number) => {
    dispatch(removeBoard({ id }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.boards}>
        {boards.map((board) => {
          return (
            <Board key={board.id} title='Posts' onCloseClick={() => onCloseClick(board.id)}>
              {board.element}
            </Board>
          );
        })}
      </div>
    </div>
  );
}
