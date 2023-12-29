import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import styles from "@/app/feed/boards/styles.module.css";
import Board from "@/app/feed/boards/Board/Board";
import People from "@/app/feed/boards/People/People";
import { removeBoard } from "@/lib/features/boardsSlice/boardSlice";
import { BoardName } from "@/app/feed/enums/BoardName";

export default function Boards() {
  const dispatch = useAppDispatch();
  const people = useAppSelector((state) => state.boards.people);

  const onCloseClick = (name: BoardName, id: number) => {
    dispatch(removeBoard({ name, id }));
  };

  return (
    <div className={styles.boards}>
      {people.map((board) => {
        return (
          <Board key={board.id} onCloseClick={() => onCloseClick(board.name, board.id)}>
            <People input={board.props.input} />
          </Board>
        );
      })}
    </div>
  );
}
