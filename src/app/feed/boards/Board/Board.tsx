import styles from "@/app/feed/boards/Board/styles.module.css";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MouseEventHandler } from "react";

type Props = {
  children: JSX.Element;
  headerChildren?: JSX.Element;
  onCloseClick?: MouseEventHandler<HTMLButtonElement>;
};

export default function Board({ children, headerChildren, onCloseClick }: Props) {
  return (
    <div className={`${styles.board} ${styles.shadow}`}>
      <div className={styles.header}>
        {headerChildren || <span></span>}
        <button className={styles.closeButton} onClick={onCloseClick}>
          <FontAwesomeIcon icon={faXmark} className={styles.closeIcon} />
        </button>
      </div>
      {children}
    </div>
  );
}
