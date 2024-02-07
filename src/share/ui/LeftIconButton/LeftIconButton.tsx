import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "@/share/ui/LeftIconButton/styles.module.css";
import { MouseEventHandler } from "react";

type Props = {
  icon: IconProp;
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

export function LeftIconButton({ icon, text, onClick, disabled }: Props) {
  return (
    <button className={styles.button} onClick={onClick} disabled={disabled}>
      <FontAwesomeIcon icon={icon} />
      <label className={styles.text}>{text}</label>
    </button>
  );
}
