import Header from "@/share/components/Header/Header";
import UsersPopupList from "@/share/components/UsersPopupList/UsersPopupList";
import { useClickOutside } from "@/share/hooks/useClickOutside";
import SearchInput from "@/share/ui/SearchInput/SearchInput";
import { useRef, useState } from "react";
import UsersFinder from "@/app/feed/classes/UserFinder";

export default function SearchHeader() {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const usersPopupListRef = useRef<HTMLDivElement>(null);
  const [showUsersPopupList, setShowUsersPopupList] = useState(false);
  const usersFinderRef = useRef<UsersFinder>(new UsersFinder(setShowUsersPopupList, searchInputRef));

  useClickOutside(() => setShowUsersPopupList(false), searchInputRef);

  const onSearchInputFocus = () => {
    if (showUsersPopupList || searchInputRef.current == null || usersFinderRef.current.users.length === 0) return;
    setShowUsersPopupList(true);
  };

  return (
    <Header
      pageName='Feed'
      centerChild={
        <div style={{ position: "relative" }}>
          <SearchInput
            innerRef={searchInputRef}
            onChange={usersFinderRef.current.searchInputChange}
            onFocus={onSearchInputFocus}
          />
          {showUsersPopupList && <UsersPopupList innerRef={usersPopupListRef} users={usersFinderRef.current.users} />}
        </div>
      }
    />
  );
}
