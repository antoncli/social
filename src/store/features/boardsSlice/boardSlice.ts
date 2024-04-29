import { PostsPayload } from "@/app/feed/boards/Posts/Posts";
import { ComposePostPayload } from "@app/feed/boards/ComposePost/ComposePost";
import { MePayload } from "@app/feed/boards/Me/Me";
import { PeoplePayload } from "@app/feed/boards/People/People";
import { UserPayload } from "@app/feed/boards/User/User";
import { BoardName } from "@app/feed/enums/BoardName";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type PeoplePayloadAction = { boardName: BoardName.people; id: number; props: PeoplePayload; headerChildren?: JSX.Element };
type UserAction = { boardName: BoardName.user; id: number; props: UserPayload; headerChildren?: JSX.Element };
type MeUserAction = { boardName: BoardName.me; id: number; props: MePayload; headerChildren?: JSX.Element };
type ComposePostAction = {
  boardName: BoardName.composePost;
  id: number;
  props: ComposePostPayload;
  headerChildren?: JSX.Element;
};
type PostsAction = { boardName: BoardName.posts; id: number; props: PostsPayload; headerChildren?: JSX.Element };

interface BoardsSlice {
  [BoardName.people]: PeoplePayloadAction[];
  [BoardName.user]: UserAction[];
  [BoardName.me]: MeUserAction[];
  [BoardName.composePost]: ComposePostAction[];
  [BoardName.posts]: PostsAction[];
}

const initialState: BoardsSlice = {
  people: [],
  user: [],
  me: [],
  composePost: [],
  posts: [],
};

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    addFriendsBoard(state, action: PayloadAction<Omit<PeoplePayloadAction, "boardName">>) {
      state[BoardName.people].push({ ...action.payload, boardName: BoardName.people });
    },
    addUserBoard(state, action: PayloadAction<Omit<UserAction, "boardName">>) {
      state[BoardName.user].push({ ...action.payload, boardName: BoardName.user });
    },
    addMeBoard(state, action: PayloadAction<Omit<MeUserAction, "boardName">>) {
      state[BoardName.me].push({ ...action.payload, boardName: BoardName.me });
    },
    addComposePostBoard(state, action: PayloadAction<Omit<ComposePostAction, "boardName">>) {
      state[BoardName.composePost].push({ ...action.payload, boardName: BoardName.composePost });
    },
    addPostsBoard(state, action: PayloadAction<Omit<PostsAction, "boardName">>) {
      state[BoardName.posts].push({ ...action.payload, boardName: BoardName.posts });
    },
    removeBoard(state, action: PayloadAction<{ boardName: BoardName; id: number }>) {
      const boards = state[action.payload.boardName];
      const index = boards.findIndex((board) => board.id === action.payload.id);
      // @ts-ignore
      state[action.payload.boardName] = [...boards.slice(0, index), ...boards.slice(index + 1)];
    },
  },
});

export const { addFriendsBoard, addUserBoard, addMeBoard, addComposePostBoard, addPostsBoard, removeBoard } = boardsSlice.actions;
export const boards = boardsSlice.reducer;
