import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faSpinner } from "@fortawesome/free-solid-svg-icons/faSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "@share/ui/LeftIconButton/styles.module.css";
import { MouseEventHandler } from "react";

type Props = {
  icon: IconProp;
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  loading?: boolean;
};

export function LeftIconButton({ icon, text, onClick, disabled, loading }: Props) {
  return (
    <button className={styles.button} onClick={onClick} disabled={disabled || loading}>
      <span className={styles.body}>
        {loading ? (
          <FontAwesomeIcon icon={faSpinner} spinPulse />
        ) : (
          <>
            <FontAwesomeIcon icon={icon} bounce />
          </>
        )}
        <label className={styles.text}>{text}</label>
      </span>
    </button>
  );
}
