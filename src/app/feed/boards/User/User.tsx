"use client";

import styles from "@app/feed/boards/User/styles.module.css";
import { memo } from "react";
import AddFriendButton from "@app/feed/boards/User/components/AddFriendButton/AddFriendButton";
import SmallUserCard from "@share/ui/SmallUserCard/SmallUserCard";
import InfinitePostsList from "@/share/components/InfinitePostsList/InfinitePostList";

export type Props = {
  name: string;
};

export default memo(function User({ name }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.user}>
          <SmallUserCard name={name} />
        </div>
        <AddFriendButton name={name} />
      </div>
      <div className={styles.body}>
        <InfinitePostsList name={name} />
      </div>
    </div>
  );
});
