"use client";

import UsersPopupList from "@/share/components/UsersPopupList/UsersPopupList";
import { useClickOutside } from "@/share/hooks/useClickOutside";
import SearchInput from "@/share/ui/SearchInput/SearchInput";
import { useEffect, useRef, useState } from "react";
import UsersFinder from "@/share/classes/UserFinder";
import { TSafeUserSchemaArray } from "@/schemas/safe/SafeUserSchema";
import { useAppDispatch } from "@/lib/hooks";
import { addFriendsBoard } from "@/lib/features/boardsSlice/boardSlice";
import { BoardName } from "@/app/feed/enums/BoardName";
import BoardId from "@/app/feed/classes/BoardId";

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

  const onShowAllClick = (input: string) => {
    dispatch(addFriendsBoard({ id: BoardId.id, name: BoardName.people, props: { input } }));
  };

  if (usersFinder == undefined) return;

  return (
    <div style={{ position: "relative" }}>
      <SearchInput innerRef={searchInputRef} onChange={usersFinder.searchInputChange} onFocus={onSearchInputFocus} />
      {showUsersPopupList && (
        <UsersPopupList innerRef={usersPopupListRef} users={users} onShowAllClick={() => onShowAllClick(usersFinder.input)} />
      )}
    </div>
  );
}
