import styles from "@/share/ui/Button/styles.module.css";

type Props = {
  text?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function Button({ text = "Click me!", onClick }: Props) {
  return (
    <button className={styles.button} onClick={onClick}>
      {text}
    </button>
  );
}
