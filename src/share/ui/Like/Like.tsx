import styles from "@share/ui/Like/styles.module.css";
import { faThumbsUp as faThumbsUpSolid } from "@fortawesome/free-solid-svg-icons/faThumbsUp";
import { faThumbsUp as faThumbsUpRegular } from "@fortawesome/free-regular-svg-icons/faThumbsUp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { MouseEventHandler } from "react";

type Props = {
  liked?: boolean;
  count?: number;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export default function Like({ liked = false, count = 0, onClick }: Props) {
  return (
    <button role='button' className={styles.button} onClick={onClick}>
      {liked ? (
        <FontAwesomeIcon icon={faThumbsUpSolid} size='sm' />
      ) : (
        <FontAwesomeIcon icon={faThumbsUpRegular as IconProp} size='sm' />
      )}
      <div className={styles.count}>
        <h6>{count}</h6>
      </div>
    </button>
  );
}
