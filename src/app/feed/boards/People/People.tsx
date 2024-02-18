"use client";

import { SafeUserSchemaArray } from "@/schemas/safe/SafeUserSchema";
import { userService } from "@/services/userService";
import UserCard from "@/share/ui/UserCard/UserCard";
import { memo, useEffect, useRef, useState } from "react";
import styles from "@/app/feed/boards/People/styles.module.css";
import { useAppDispatch } from "@/store/hooks";
import { addUserBoard } from "@/store/features/boardsSlice/boardSlice";
import BoardId from "@/app/feed/classes/BoardId";
import { User } from "@/schemas/UserSchema";

export type PeoplePayload = {
  input: string;
};

type Props = PeoplePayload;

export default memo(function People({ input }: Props) {
  const dispatch = useAppDispatch();
  const pageRef = useRef(1);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    updateUsers(input, pageRef.current, 20);
  }, []);

  const onScroll = async (e: any) => {
    if (e.target.scrollTop / e.target.scrollTopMax >= 0.8) {
      updateUsers(input, pageRef.current, 20);
    }
  };

  const updateUsers = async (input: string, page: number, limit: number) => {
    const res = await userService.find(input, page, limit);

    const usersParseRes = SafeUserSchemaArray.safeParse(res.data);
    if (!usersParseRes.success) return;

    pageRef.current++;
    setUsers([...users, ...usersParseRes.data]);
  };

  const onUserClick = (user: User) => {
    dispatch(addUserBoard({ id: BoardId.id, props: { user } }));
  };

  return (
    <div className={styles.users} onScroll={onScroll}>
      {users.map((user, i) => (
        <UserCard key={i} user={user} onClick={() => onUserClick(user)} />
      ))}
    </div>
  );
});
