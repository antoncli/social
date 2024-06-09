import Button from "@share/ui/Button/Button";
import styles from "@share/components/CommentForm/styles.module.css";
import { useRef, useState } from "react";
import { LeftIconButton } from "@share/ui/LeftIconButton/LeftIconButton";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import AutoResizableTextArea from "@/share/ui/AutoResizableTextArea/AutoResizableTextArea";

type Props = {
  loading?: boolean;
  onSubmit?: (text: string) => void;
  onCancel?: () => void;
};

export default function CommentForm({ loading = false, onSubmit, onCancel }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [text, setText] = useState<string>("");

  function submit(formData: FormData) {
    try {
      onSubmit?.(formData.get("text")!.toString());
      setText("");
    } catch {
      console.log("Can't submit form!");
    }
  }

  return (
    <div>
      <form role='form' ref={formRef} className={styles.form} action={submit}>
        <AutoResizableTextArea
          name='text'
          placeholder='Comment it!'
          text={text}
          onChange={(e) => setText(e.target.value)}
          onEnterDown={() => formRef.current?.requestSubmit()}
        />
        <span className={styles.buttons}>
          <Button text='Cancel' onClick={() => onCancel?.()} />
          <LeftIconButton type='submit' icon={faPaperPlane} text='Comment' loading={loading} disabled={text.length === 0} />
        </span>
      </form>
    </div>
  );
}
