import styles from "@/share/ui/SearchInput/styles.module.css";
import { ChangeEventHandler, FocusEventHandler, KeyboardEventHandler, LegacyRef } from "react";

type Props = {
  width?: string;
  height?: string;
  innerRef?: LegacyRef<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
};

export default function SearchInput({ width = "20vw", height = "26px", innerRef, onChange, onKeyDown, onFocus }: Props) {
  return (
    <input
      ref={innerRef}
      className={styles.input}
      style={{ width, height }}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
    ></input>
  );
}
