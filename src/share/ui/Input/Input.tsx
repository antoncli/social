import styles from "@/share/ui/Input/styles.module.css";
import React from "react";

type Props = {
  type?: string;
  width?: string;
  height?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({ width = "160px", height = "30px", placeholder = "text", onChange, type }: Props) {
  return (
    <input className={styles.input} style={{ width, height }} type={type} placeholder={placeholder} onChange={onChange}></input>
  );
}
