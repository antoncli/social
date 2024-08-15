import { memo } from "react";
import styles from "@app/feed/boards/Posts/styles.module.css";
import InfinitePostsList from "@/share/components/InfinitePostsList/InfinitePostList";

export type Props = {};

export default memo(function Posts() {
  return (
    <div className={styles.container}>
      <InfinitePostsList />
    </div>
  );
});
