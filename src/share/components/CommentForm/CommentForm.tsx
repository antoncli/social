import AutoResizableTextArea from "@share/ui/AutoResizableTextArea/AutoResizableTextArea";
import Button from "@share/ui/Button/Button";
import styles from "@share/components/CommentForm/styles.module.css";
import { useEffect, useRef, useState } from "react";
import { LeftIconButton } from "@share/ui/LeftIconButton/LeftIconButton";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

type Props = {
  loading?: boolean;
  onSubmit?: (text: string) => void;
  onCancel?: () => void;
};

export default function CommentForm({ loading = false, onSubmit, onCancel }: Props) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState<string>("");

  useEffect(() => {
    if (textAreaRef && textAreaRef.current) {
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
    }
  }, []);

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
      <form role='form' className={styles.form} action={submit}>
        <AutoResizableTextArea name='text' placeholder='Comment it!' value={text} onChange={(e) => setText(e.target.value)} />
        <span className={styles.buttons}>
          <Button text='Cancel' onClick={() => onCancel?.()} />
          <LeftIconButton type='submit' icon={faPaperPlane} text='Comment' loading={loading} disabled={text.length === 0} />
        </span>
      </form>
    </div>
  );
}
