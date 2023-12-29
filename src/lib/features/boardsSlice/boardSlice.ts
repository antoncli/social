import { PeoplePayload } from "@/app/feed/boards/People/People";
import { BoardName } from "@/app/feed/enums/BoardName";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type PeoplePayloadAction = { name: BoardName.people; id: number; props: PeoplePayload; headerChildren?: JSX.Element };

interface BoardsSlice {
  [BoardName.people]: PeoplePayloadAction[];
}

const initialState: BoardsSlice = {
  people: [],
};

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    addFriendsBoard(state, action: PayloadAction<PeoplePayloadAction>) {
      state[BoardName.people].push(action.payload);
    },
    removeBoard(state, action: PayloadAction<{ name: BoardName; id: number }>) {
      if (BoardName.people) {
        const boards = state[action.payload.name];
        const index = boards.findIndex((board) => board.id === action.payload.id);
        state[action.payload.name] = [...boards.slice(0, index), ...boards.slice(index + 1)];
      }
    },
  },
});

export const { addFriendsBoard, removeBoard } = boardsSlice.actions;
export const boards = boardsSlice.reducer;
