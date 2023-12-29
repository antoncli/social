import { TSafeUserSchemaArray, SafeUserSchemaArray } from "@/schemas/safe/SafeUserSchema";
import { userService } from "@/services/userService";
import axios from "axios";
import { Dispatch, SetStateAction, RefObject, ChangeEventHandler } from "react";

export default class UsersFinder {
  private _users: TSafeUserSchemaArray = [];
  private _setShowUsersPopupList: Dispatch<SetStateAction<boolean>>;
  private _setUsers: Dispatch<SetStateAction<{ name: string }[]>>;
  private _searchInputRef: RefObject<HTMLInputElement>;
  private _searchInputPrevValue: string = "";
  private _inputChangeTimeout: NodeJS.Timeout | null = null;
  private _windowResizeTimeout: NodeJS.Timeout | null = null;
  private _rowHeight: number;

  constructor(
    setShowUsersPopupList: Dispatch<SetStateAction<boolean>>,
    setUsers: Dispatch<SetStateAction<{ name: string }[]>>,
    searchInputRef: RefObject<HTMLInputElement>,
    rowHeight: number
  ) {
    this._setShowUsersPopupList = setShowUsersPopupList;
    this._setUsers = setUsers;
    this._searchInputRef = searchInputRef;
    this._rowHeight = rowHeight;

    addEventListener("resize", this._onWindowResize);
  }

  get input(): string {
    return this._searchInputPrevValue;
  }

  destroy() {
    removeEventListener("resize", this._onWindowResize);
  }

  searchInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (this._inputChangeTimeout != null) {
      clearTimeout(this._inputChangeTimeout);
    }

    if (e.target.value === "") {
      this._searchInputPrevValue = "";
      this._users = [];
      this._setShowUsersPopupList(false);
      return;
    }

    const timeout = this._changeTimeout();
    this._inputChangeTimeout = timeout;
  };

  private _fetchUsers = async (input: string) => {
    try {
      const limit = Math.floor((window.innerHeight * 0.5) / this._rowHeight);
      const res = await userService.find(input, 1, limit);

      const usersParseRes = SafeUserSchemaArray.safeParse(res.data);
      if (!usersParseRes.success) return;

      this._users = usersParseRes.data;
      this._setUsers(this._users);
      this._setShowUsersPopupList(usersParseRes.data.length > 0);
    } catch {}
  };

  private _changeTimeout = (): NodeJS.Timeout => {
    return setTimeout(async () => {
      if (this._searchInputRef.current == null) {
        this._inputChangeTimeout = null;
        return;
      }

      const input = this._searchInputRef.current.value;
      if (input === this._searchInputPrevValue) return;
      this._searchInputPrevValue = input;

      await this._fetchUsers(input);

      this._inputChangeTimeout = null;
    }, 200);
  };

  _onWindowResize = () => {
    if (this._windowResizeTimeout != null) {
      clearTimeout(this._windowResizeTimeout);
    }

    if (this._searchInputPrevValue === "") return;

    this._windowResizeTimeout = setTimeout(() => {
      const limit = Math.floor((window.innerHeight * 0.5) / this._rowHeight);
      if (limit <= this._users.length) {
        this._setUsers(this._users.slice(0, limit));
      } else if (limit > this._users.length) this._fetchUsers(this._searchInputPrevValue);

      this._windowResizeTimeout = null;
    }, 200);
  };
}
