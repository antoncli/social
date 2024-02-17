import styles from "@share/ui/RoundButton/styles.module.css";
import { MouseEventHandler, ReactElement } from "react";

type Props = {
  children?: ReactElement;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export default function RoundButton({ children, onClick }: Props) {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
}
