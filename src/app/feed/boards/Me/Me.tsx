import styles from "@app/feed/boards/Me/styles.module.css";
import { memo } from "react";
import { getJWTData } from "@/share/helpers/getJWTData";
import InfinitePostsList from "@/share/components/InfinitePostsList/InfinitePostList";

export type Props = {};

export default memo(function Me() {
  return (
    <div className={styles.container}>
      <InfinitePostsList name={getJWTData().name} />
    </div>
  );
});
