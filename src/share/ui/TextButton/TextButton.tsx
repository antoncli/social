import styles from "@/share/ui/TextButton/styles.module.css";

type Props = {
  text?: string;
};

export default function TextButton({ text = "Click me!" }: Props) {
  return <button className={styles.button}>{text}</button>;
}
