import { SafeUserSchemaArray, TSafeUserSchemaArray } from "@/schemas/safe/SafeUserSchema";
import { userService } from "@/services/userService";
import SmallUserCard from "@/share/ui/SmallUserCard/SmallUserCard";
import { useEffect, useRef, useState } from "react";
import styles from "@/app/feed/boards/People/styles.module.css";

export type PeoplePayload = {
  input: string;
};

type Props = PeoplePayload;

export default function People({ input }: Props) {
  const pageRef = useRef(1);
  const [users, setUsers] = useState<TSafeUserSchemaArray>([]);

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

  return (
    <div className={styles.users} onScroll={onScroll}>
      {users.map((user, i) => (
        <SmallUserCard key={i} user={user} />
      ))}
    </div>
  );
}
