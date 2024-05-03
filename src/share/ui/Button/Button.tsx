import styles from "@share/ui/Button/styles.module.css";
import { ButtonHTMLAttributes } from "react";

type Props = {
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  text?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  border?: boolean;
};

export default function Button({ type = "button", text = "Click me!", onClick, border = false }: Props) {
  return (
    <button role='button' type={type} className={`${styles.button} ${!border && styles.noBorder}`} onClick={onClick}>
      {text}
    </button>
  );
}
