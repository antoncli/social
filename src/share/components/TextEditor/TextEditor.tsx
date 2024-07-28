import AutoResizableTextArea from "@share/ui/AutoResizableTextArea/AutoResizableTextArea";
import Button from "@share/ui/Button/Button";
import { FormEventHandler, useCallback, useState } from "react";
import styles from "./styles.module.css";
import { LeftIconButton } from "@share/ui/LeftIconButton/LeftIconButton";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

type Props = {
  text: string;
  placeholder?: string;
  onSubmitButtonText?: string;
  onCancel?: () => unknown;
  onSubmit?: (text: string) => Promise<unknown>;
};

export default function TextEditor({ text, placeholder, onSubmitButtonText = "Edit", onCancel, onSubmit }: Props) {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [value, setValue] = useState<string>(text);

  const handleSubmit = async (formData: FormData) => {
    if (!onSubmit) return;
    const text = formData.get("text");
    if (text != null) {
      setSubmitting(true);
      await onSubmit(text.toString());
      setSubmitting(false);
      setValue("");
    }
  };

  return (
    <form action={handleSubmit} className={styles.form}>
      <AutoResizableTextArea
        name='text'
        text={value}
        placeholder={placeholder}
        scrollToIfNotVisible={true}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className={styles.bottom}>
        <Button text='Cancel' onClick={onCancel} />
        <LeftIconButton
          type='submit'
          icon={faPaperPlane}
          text={onSubmitButtonText}
          loading={submitting}
          disabled={value.length === 0}
        />
      </div>
    </form>
  );
}
