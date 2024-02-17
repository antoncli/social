import { memo } from "react";
import styles from "@app/feed/boards/ComposePost/styles.module.css";
import { LeftIconButton } from "@/share/ui/LeftIconButton/LeftIconButton";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons/faPaperPlane";

export type ComposePostPayload = {};

export default memo(function ComposePost({}: ComposePostPayload) {
  return (
    <form className={styles.container}>
      <div className={styles.center}>
        <textarea className={styles.textarea} placeholder='What heppens?'></textarea>
      </div>
      <div className={styles.bottom}>
        <LeftIconButton icon={faPaperPlane} text='Publish' />
      </div>
    </form>
  );
});
