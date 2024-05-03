import styles from "@/app/feed/boards/Board/styles.module.css";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MouseEventHandler } from "react";

type Props = {
  children: JSX.Element;
  title?: string;
  onCloseClick?: MouseEventHandler<HTMLButtonElement>;
};

export default function Board({ children, title, onCloseClick }: Props) {
  return (
    <div className={styles.board}>
      <div className={styles.header}>
        <h4>{title || ""}</h4>
        <button className={styles.closeButton} onClick={onCloseClick}>
          <FontAwesomeIcon icon={faXmark} className={styles.closeIcon} />
        </button>
      </div>
      <div className={styles.budy}>{children}</div>
    </div>
  );
}
