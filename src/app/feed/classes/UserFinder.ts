import { TSafeUserSchemaArray, SafeUserSchemaArray } from "@/schemas/safe/SafeUserSchema";
import axios from "axios";
import { Dispatch, SetStateAction, RefObject, ChangeEventHandler } from "react";

export default class UsersFinder {
  private _users: TSafeUserSchemaArray = [];
  private _setShowUsersPopupList: Dispatch<SetStateAction<boolean>>;
  private _searchInputRef: RefObject<HTMLInputElement>;
  private _searchInputPrevValue: string = "";
  private _timeout: NodeJS.Timeout | null = null;

  constructor(setShowUsersPopupList: Dispatch<SetStateAction<boolean>>, searchInputRef: RefObject<HTMLInputElement>) {
    this._setShowUsersPopupList = setShowUsersPopupList;
    this._searchInputRef = searchInputRef;
  }

  get users(): TSafeUserSchemaArray {
    return this._users;
  }

  fetchUsers = async (input: string) => {
    try {
      const res = await axios.get("/api/users/find", { params: { input, page: 1 } });

      const usersParseRes = SafeUserSchemaArray.safeParse(res.data);
      if (!usersParseRes.success) return;

      this._users = usersParseRes.data;
      this._setShowUsersPopupList(usersParseRes.data.length > 0);
    } catch {}
  };

  changeTimeout = (): NodeJS.Timeout => {
    const timeout = setTimeout(async () => {
      if (this._searchInputRef.current == null) {
        clearTimeout(timeout);
        this._timeout = null;
        return;
      }

      const input = this._searchInputRef.current.value;
      if (input === this._searchInputPrevValue) return;
      this._searchInputPrevValue = input;

      await this.fetchUsers(input);

      clearTimeout(timeout);
      this._timeout = null;
    }, 200);

    return timeout;
  };

  searchInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (this._timeout != null) {
      clearTimeout(this._timeout);
    }

    if (e.target.value === "") {
      this._setShowUsersPopupList(false);
      return;
    }

    const timeout = this.changeTimeout();
    this._timeout = timeout;
  };
}
