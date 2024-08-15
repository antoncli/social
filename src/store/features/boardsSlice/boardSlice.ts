import { BoardName } from "@app/feed/enums/BoardName";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type AddBoardPayload = {
  id: number;
  type: BoardName;
  element: JSX.Element;
};

interface BoardsSlice {
  boards: AddBoardPayload[];
}

const initialState: BoardsSlice = {
  boards: [],
};

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    addBoard(state, action: PayloadAction<AddBoardPayload>) {
      state.boards.push(action.payload);
    },
    removeBoard(state, action: PayloadAction<{ id: number }>) {
      const index = state.boards.findIndex((board) => board.id === action.payload.id);
      if (index !== -1) state.boards.splice(index, 1);
    },
  },
});

export const { addBoard, removeBoard } = boardsSlice.actions;
export const boards = boardsSlice.reducer;
