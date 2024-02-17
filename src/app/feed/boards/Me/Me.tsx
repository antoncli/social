import styles from "@app/feed/boards/Me/styles.module.css";
import { memo } from "react";

export type MePayload = {};

export default memo(function Me({}: MePayload) {
  return <div>Me</div>;
});
