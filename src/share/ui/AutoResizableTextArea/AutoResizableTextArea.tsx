import {
  ChangeEvent,
  ChangeEventHandler,
  KeyboardEvent,
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./styles.module.css";

type Props = {
  text: string;
  placeholder?: string;
  name?: string;
  maxHeight?: number;
  readOnly?: boolean;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  onEnterDown?: KeyboardEventHandler<HTMLTextAreaElement>;
};

export default function AutoResizableTextArea({
  text = "",
  name = "",
  placeholder = "",
  maxHeight = 100,
  readOnly = false,
  onChange = () => {},
  onEnterDown,
}: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [readMore, setReadMore] = useState<boolean>(false);

  useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = "1px";
    const height = textareaRef.current.scrollHeight;

    if (height > maxHeight) {
      textareaRef.current.style.height = maxHeight + "px";
      textareaRef.current.style.textOverflow = "ellipsis";
      textareaRef.current.style.whiteSpace = "nowrap";
      setReadMore(true);
      return;
    }

    textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
  }, [textareaRef.current, text]);

  const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = "1px";
    e.target.style.height = e.target.scrollHeight + "px";
    onChange?.(e);
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (name === "") return;
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onEnterDown?.(e);
    }
  }, []);

  return (
    <span>
      <textarea
        name={name}
        placeholder={placeholder}
        ref={textareaRef}
        className={`${styles.textarea} ${readOnly ? styles.backgroundReadOnly : styles.backgroundReadWrite}`}
        value={text}
        readOnly={readOnly}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {readMore ? "ReadMore" : null}
    </span>
  );
}
