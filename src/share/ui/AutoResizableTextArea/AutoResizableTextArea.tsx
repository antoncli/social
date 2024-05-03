import styles from "@share/ui/AutoResizableTextArea/styles.module.css";
import { ChangeEventHandler, useEffect, useRef } from "react";

type Props = {
  name?: string;
  placeholder?: string;
  value?: string;
  minHeight?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
};

export default function AutoResizableTextArea({ name, placeholder, value, minHeight = "60px", onChange }: Props) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textAreaRef && textAreaRef.current) {
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
    }
  }, []);

  return (
    <textarea
      value={value}
      role='textbox'
      ref={textAreaRef}
      style={{ minHeight }}
      className={styles.textarea}
      name={name}
      placeholder={placeholder}
      onChange={(e) => {
        onChange?.(e);
        if (textAreaRef && textAreaRef.current) {
          textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
        }
      }}
    />
  );
}
