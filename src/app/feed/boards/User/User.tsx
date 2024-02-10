"use client";

import styles from "@/app/feed/boards/User/styles.module.css";
import { User } from "@/schemas/UserSchema";
import { UserIcon } from "@/share/ui/UserIcon/UserIcon";
import { memo } from "react";
import AddFriendButton from "./components/AddFriendButton/AddFriendButton";

export type UserPayload = {
  user: User;
};

export default memo(function User({ user }: UserPayload) {
  return (
    <div>
      <div className={styles.header}>
        <div className={styles.user}>
          <UserIcon name={user.name}></UserIcon>
          <label className={styles.label}>{user.name}</label>
        </div>
        <AddFriendButton user={user} />
      </div>
    </div>
  );
});
