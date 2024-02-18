import { ChangeEvent, MouseEventHandler, memo, useState } from "react";
import styles from "@app/feed/boards/ComposePost/styles.module.css";
import { LeftIconButton } from "@/share/ui/LeftIconButton/LeftIconButton";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons/faPaperPlane";
import { postService } from "@/services/postService";

export type ComposePostPayload = {};

export default memo(function ComposePost({}: ComposePostPayload) {
  const [text, setText] = useState("");
  const [wait, setWait] = useState(false);

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handlePublish: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    // TODO ALERT
    if (text.length === 0) {
      console.log("Post text is empty!");
      return;
    }
    setWait(true);
    postService.add(text).finally(() => {
      setWait(false);
    });
  };

  return (
    <form className={styles.container}>
      <div className={styles.center}>
        <textarea className={styles.textarea} placeholder='What heppens?' onChange={handleTextChange}></textarea>
      </div>
      <div className={styles.bottom}>
        <LeftIconButton icon={faPaperPlane} text='Publish' loading={wait} onClick={handlePublish} />
      </div>
    </form>
  );
});
