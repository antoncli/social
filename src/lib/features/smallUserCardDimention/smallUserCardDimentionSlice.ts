import { createSlice } from "@reduxjs/toolkit";

interface SmallUserCardDimentionState {
  height: number;
}

const initialState: SmallUserCardDimentionState = {
  height: 10,
};

const smallUserCardDimentionSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    set(state, action) {
      state.height = action.payload;
    },
  },
});

export const { set } = smallUserCardDimentionSlice.actions;
export const smallUserCardDimentionSliceReducer = smallUserCardDimentionSlice.reducer;
