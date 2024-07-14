import {
  ChangeEvent,
  ChangeEventHandler,
  FocusEvent,
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
  readOnly?: boolean;
  scrollIntoView?: boolean;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  onEnterDown?: KeyboardEventHandler<HTMLTextAreaElement>;
};

export default function AutoResizableTextArea({
  text = "",
  name = "",
  placeholder = "",
  readOnly = false,
  scrollIntoView = false,
  onChange = () => {},
  onEnterDown,
}: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const focusedRef = useRef<boolean>(false);
  const [value, setValue] = useState<string>(text);

  useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
  }, [textareaRef.current, value]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      e.target.style.height = e.target.scrollHeight + "px";
      onChange?.(e);
      setValue(e.target.value);
    },
    [onChange]
  );

  const moveCaretAtEnd = (e: FocusEvent<HTMLTextAreaElement, Element>) => {
    if (focusedRef.current) return;
    const temp_value = e.target.value;
    e.target.value = "";
    e.target.value = temp_value;
    if (scrollIntoView) e.target.scrollIntoView({ behavior: "smooth" });
    focusedRef.current = true;
  };

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (name === "") return;
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onEnterDown?.(e);
    }
  }, []);

  return (
    <textarea
      name={name}
      placeholder={placeholder}
      ref={textareaRef}
      className={`${styles.textarea} ${readOnly ? styles.backgroundReadOnly : styles.backgroundReadWrite}`}
      value={value}
      readOnly={readOnly}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      autoFocus={true}
      onFocus={moveCaretAtEnd}
    />
  );
}
