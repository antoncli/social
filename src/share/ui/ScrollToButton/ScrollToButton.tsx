import { faArrowUp } from "@fortawesome/free-solid-svg-icons/faArrowUp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "@share/ui/ScrollToButton/styles.module.css";
import { MouseEventHandler } from "react";

type Props = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export default function ScrollToButton({ onClick }: Props) {
  return (
    <button role='button' className={styles.button} onClick={onClick}>
      <FontAwesomeIcon icon={faArrowUp} />
    </button>
  );
}
