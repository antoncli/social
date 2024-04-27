import { faArrowUp } from "@fortawesome/free-solid-svg-icons/faArrowUp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "@share/ui/ScrollToButton/styles.module.css";

export default function ScrollToButton() {
  return (
    <button className={styles.button}>
      <FontAwesomeIcon icon={faArrowUp} />
    </button>
  );
}
