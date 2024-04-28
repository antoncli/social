import { memo } from "react";
import styles from "@app/feed/boards/Posts/styles.module.css";
import InfinitePostsList from "@/share/components/InfinitePostsList/InfinitePostsList";

export type PostsPayload = {};

export default memo(function Posts({}: PostsPayload) {
  return (
    <div className={styles.container}>
      <InfinitePostsList />
    </div>
  );
});
