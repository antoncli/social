import AutoResizableTextArea from "@share/ui/AutoResizableTextArea/AutoResizableTextArea";
import Button from "@share/ui/Button/Button";
import { FormEventHandler, useCallback, useState } from "react";
import styles from "./styles.module.css";
import { LeftIconButton } from "@share/ui/LeftIconButton/LeftIconButton";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

type Props = {
  text: string;
  onCancel?: () => void;
  onSubmit?: (text: string) => Promise<void>;
};

export default function TextEditor({ text, onCancel, onSubmit }: Props) {
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleSubmit = async (formData: FormData) => {
    if (!onSubmit) return;
    const text = formData.get("comment");
    if (text != null) {
      setSubmitting(true);
      await onSubmit(text.toString());
      setSubmitting(false);
    }
  };

  return (
    <form action={handleSubmit} className={styles.form}>
      <AutoResizableTextArea name='comment' text={text} scrollToIfNotVisible={true} />
      <div className={styles.bottom}>
        <Button type='submit' text='Cancel' onClick={onCancel} />
        <LeftIconButton type='submit' icon={faPaperPlane} text='Edit' loading={submitting} disabled={text.length === 0} />
      </div>
    </form>
  );
}
