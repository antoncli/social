import styles from "@share/ui/Dislike/styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faThumbsDown as faThumbsDownSolid } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown as faThumbsDownRegular } from "@fortawesome/free-regular-svg-icons";
import { MouseEventHandler } from "react";

type Props = {
  disliked?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export default function Dislike({ disliked = false, onClick }: Props) {
  return (
    <button role='button' className={styles.button} onClick={onClick}>
      {disliked ? (
        <FontAwesomeIcon icon={faThumbsDownSolid} size='sm' />
      ) : (
        <FontAwesomeIcon icon={faThumbsDownRegular as IconProp} size='sm' />
      )}
    </button>
  );
}
