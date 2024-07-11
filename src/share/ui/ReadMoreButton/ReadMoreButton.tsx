import { MouseEventHandler } from "react";
import styles from "./styles.module.css";

type Props = {
  showLess?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export default function ReadMoreButton({ showLess = false, onClick }: Props) {
  return (
    <button className={styles.button} onClick={onClick}>
      {showLess ? "Show less" : "Read more"}
    </button>
  );
}
