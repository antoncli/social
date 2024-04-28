import styles from "@app/feed/boards/Me/styles.module.css";
import { memo } from "react";
import { getJWTData } from "@/share/helpers/getJWTData";
import InfinitePostsList from "@/share/components/InfinitePostsList/InfinitePostsList";

export type MePayload = {};

export default memo(function Me({}: MePayload) {
  return (
    <div className={styles.container}>
      <InfinitePostsList name={getJWTData().name} />
    </div>
  );
});
