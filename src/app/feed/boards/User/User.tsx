"use client";

import styles from "@app/feed/boards/User/styles.module.css";
import { User } from "@schemas/UserSchema";
import { memo } from "react";
import AddFriendButton from "@app/feed/boards/User/components/AddFriendButton/AddFriendButton";
import SmallUserCard from "@share/ui/SmallUserCard/SmallUserCard";

export type UserPayload = {
  user: User;
};

export default memo(function User({ user }: UserPayload) {
  return (
    <div>
      <div className={styles.header}>
        <div className={styles.user}>
          <SmallUserCard name={user.name} />
        </div>
        <AddFriendButton user={user} />
      </div>
    </div>
  );
});
