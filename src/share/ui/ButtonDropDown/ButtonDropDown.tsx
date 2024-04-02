import { useClickOutside } from "@share/hooks/useClickOutside";
import { DropDownRow } from "@share/types/DropDownRow";
import styles from "@share/ui/ButtonDropDown/styles.module.css";
import { ReactElement, useRef, useState } from "react";

type Props = {
  children: ReactElement;
  rows: DropDownRow[];
};

export default function ButtonDropDown({ children, rows }: Props) {
  const dropDownRef = useRef(null);
  const [showDropDown, setShowDropDown] = useState<boolean>(false);

  useClickOutside(() => setShowDropDown(false), dropDownRef);

  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
  };

  return (
    <div ref={dropDownRef} className={styles.container} onClick={toggleDropDown}>
      {children}
      {showDropDown && (
        <div className={styles.dropdown}>
          {rows.map((row) => (
            <div key={row.id} className={styles.row} onClick={() => row.callback && row.callback()}>
              {row.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
