import styles from "@/share/ui/Button/styles.module.css";
import { ButtonHTMLAttributes } from "react";

type Props = {
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  text?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function Button({ type = "button", text = "Click me!", onClick }: Props) {
  return (
    <button type={type} className={styles.button} onClick={onClick}>
      {text}
    </button>
  );
}
