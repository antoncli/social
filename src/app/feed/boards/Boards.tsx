"use client";

import { useAppDispatch, useAppSelector } from "@store/hooks";
import styles from "@app/feed/boards/styles.module.css";
import Board from "@app/feed/boards/Board/Board";
import People from "@app/feed/boards/People/People";
import { addPostsBoard, removeBoard } from "@store/features/boardsSlice/boardSlice";
import { BoardName } from "@app/feed/enums/BoardName";
import User from "@app/feed/boards//User/User";
import Me from "@app/feed/boards/Me/Me";
import ComposePost from "@app/feed/boards/ComposePost/ComposePost";
import Posts from "@app/feed/boards/Posts/Posts";
import { useEffect } from "react";
import BoardId from "@app/feed/classes/BoardId";

export default function Boards() {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.boards.posts);
  const people = useAppSelector((state) => state.boards.people);
  const user = useAppSelector((state) => state.boards.user);
  const me = useAppSelector((state) => state.boards.me);
  const composePost = useAppSelector((state) => state.boards.composePost);

  useEffect(() => {
    dispatch(addPostsBoard({ id: BoardId.id, props: {} }));
  }, []);

  const onCloseClick = (boardName: BoardName, id: number) => {
    dispatch(removeBoard({ boardName, id }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.boards}>
        {posts.map((board) => {
          return (
            <Board key={board.id} title='Posts' onCloseClick={() => onCloseClick(board.boardName, board.id)}>
              <Posts />
            </Board>
          );
        })}
        {people.map((board) => {
          return (
            <Board key={board.id} title='People' onCloseClick={() => onCloseClick(board.boardName, board.id)}>
              <People input={board.props.input} />
            </Board>
          );
        })}
        {user.map((board) => {
          return (
            <Board key={board.id} title='User' onCloseClick={() => onCloseClick(board.boardName, board.id)}>
              <User name={board.props.name} />
            </Board>
          );
        })}
        {me.map((board) => {
          return (
            <Board key={board.id} title='Me' onCloseClick={() => onCloseClick(board.boardName, board.id)}>
              <Me />
            </Board>
          );
        })}
        {composePost.map((board) => {
          return (
            <Board key={board.id} title='Post creator' onCloseClick={() => onCloseClick(board.boardName, board.id)}>
              <ComposePost />
            </Board>
          );
        })}
      </div>
    </div>
  );
}
