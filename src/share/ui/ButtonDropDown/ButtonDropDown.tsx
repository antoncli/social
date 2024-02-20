import { DropDownRow } from "@/share/types/DropDownRow";
import styles from "@share/ui/ButtonDropDown/styles.module.css";
import { ReactElement } from "react";

type Props = {
  children: ReactElement;
  rows: DropDownRow[];
};

export default function ButtonDropDown({ children, rows }: Props) {
  return (
    <div className={styles.container}>
      {children}
      <div className={styles.dropdown}>
        {rows.map((row) => (
          <div className={styles.row}>{row.text}</div>
        ))}
      </div>
    </div>
  );
}
