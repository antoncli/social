import { Boards } from "@/app/feed/classes/boardFactory";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type BoardData = { name: keyof Boards; id: string; props: unknown };

interface BoardsSlice {
  boards: BoardData[];
}

const initialState: BoardsSlice = {
  boards: [],
};

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    addBoard(state, action: PayloadAction<BoardData>) {
      console.log("Hello");
      state.boards.push(action.payload);
    },
    removeBoard(state, action: PayloadAction<string>) {
      const index = state.boards.findIndex((board) => board.id === action.payload);
      state.boards = [...state.boards.slice(0, index), ...state.boards.slice(index + 1)];
    },
  },
});

export const { addBoard, removeBoard } = boardsSlice.actions;
export const boards = boardsSlice.reducer;
