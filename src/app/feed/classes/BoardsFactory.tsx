import { AddBoardPayload } from "@/store/features/boardsSlice/boardSlice";
import ComposePost from "../boards/ComposePost/ComposePost";
import Me from "../boards/Me/Me";
import People from "../boards/People/People";
import Posts from "../boards/Posts/Posts";
import User from "../boards/User/User";
import { BoardName } from "../enums/BoardName";
import BoardId from "./BoardId";
import { Props as PeopleProps } from "../boards/People/People";
import { Props as ComposePostProps } from "../boards/ComposePost/ComposePost";
import { Props as MeProps } from "../boards/Me/Me";
import { Props as UserProps } from "../boards/User/User";
import { Props as PostProps } from "../boards/Posts/Posts";

type Props = {
  [BoardName.people]: PeopleProps;
  [BoardName.user]: UserProps;
  [BoardName.me]: MeProps;
  [BoardName.composePost]: ComposePostProps;
  [BoardName.posts]: PostProps;
};

const test = { input: "test" };

export default class BoardsFactory {
  static get<T extends BoardName>(boardName: T, props: Props[T]): AddBoardPayload {
    switch (boardName) {
      case BoardName.people:
        return { id: BoardId.id, type: boardName, element: <People {...(props as Props[BoardName.people])} /> };
      case BoardName.user:
        return { id: BoardId.id, type: boardName, element: <User {...(props as Props[BoardName.user])} /> };
      case BoardName.me:
        return { id: BoardId.id, type: boardName, element: <Me /> };
      case BoardName.composePost:
        return { id: BoardId.id, type: boardName, element: <ComposePost /> };
      case BoardName.posts:
        return { id: BoardId.id, type: boardName, element: <Posts /> };
      default:
        throw new Error(`Unsupported board name: ${boardName}`);
    }
  }
}
