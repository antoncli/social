"use client";

import UsersPopupList from "@/share/components/UsersPopupList/UsersPopupList";
import { useClickOutside } from "@/share/hooks/useClickOutside";
import SearchInput from "@/share/ui/SearchInput/SearchInput";
import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import UsersFinder from "@/share/classes/UserFinder";
import { TSafeUserSchemaArray } from "@/schemas/safe/SafeUserSchema";
import { useAppDispatch } from "@/lib/hooks";
import { addBoard } from "@/lib/features/boardsSlice/boardSlice";

export default function UsersDropDown() {
  const dispatch = useAppDispatch();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const usersPopupListRef = useRef<HTMLDivElement>(null);
  const [showUsersPopupList, setShowUsersPopupList] = useState(false);
  const [users, setUsers] = useState<TSafeUserSchemaArray>([]);
  const [usersFinder, setUsersFinder] = useState<UsersFinder>();

  useEffect(() => {
    const finder = new UsersFinder(setShowUsersPopupList, setUsers, searchInputRef, 30);
    setUsersFinder(finder);
    return () => finder.destroy();
  }, []);

  useClickOutside(() => setShowUsersPopupList(false), searchInputRef);

  const onSearchInputFocus = () => {
    if (showUsersPopupList || searchInputRef.current == null || users.length === 0) return;
    setShowUsersPopupList(true);
  };

  const searchInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch(addBoard({ id: "test", name: "friends", props: e.target.value }));
    usersFinder?.searchInputChange(e);
  };

  if (usersFinder == undefined) return;

  return (
    <div style={{ position: "relative" }}>
      <SearchInput innerRef={searchInputRef} onChange={searchInputChange} onFocus={onSearchInputFocus} />
      {showUsersPopupList && <UsersPopupList innerRef={usersPopupListRef} users={users} />}
    </div>
  );
}
