import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment as faCommentSolid } from "@fortawesome/free-solid-svg-icons";
import { faComment as faCommentRegular } from "@fortawesome/free-regular-svg-icons";
import styles from "@share/ui/CommentButton/styles.module.css";
import { MouseEventHandler } from "react";

type Props = {
  active?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export default function CommentButton({ active = false, onClick }: Props) {
  return (
    <button role='button' className={styles.button} onClick={onClick}>
      {active ? (
        <FontAwesomeIcon icon={faCommentSolid as IconProp} size='sm' />
      ) : (
        <FontAwesomeIcon icon={faCommentRegular as IconProp} size='sm' />
      )}
    </button>
  );
}
