"use client";

import { useAuthorized } from "@/share/hooks/useAuthorized";
import UsersDropDown from "@/share/components/UsersDropDown/UserDropDown";
import Header from "@/share/components/Header/Header";
import Board from "./boards/board";

export default function Feed() {
  useAuthorized();

  return (
    <div>
      <Header pageName='Feed' centerChild={<UsersDropDown />} />
      <Board />
    </div>
  );
}
