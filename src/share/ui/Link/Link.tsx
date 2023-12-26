import { default as NLink } from "next/link";
import styles from "@/share/ui/Link/styles.module.css";

type Props = {
  href: string;
  text: string;
};

export default function Link({ href, text }: Props) {
  return (
    <NLink className={styles.link} href={href}>
      {text}
    </NLink>
  );
}
