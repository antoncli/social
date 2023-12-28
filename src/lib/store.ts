import { configureStore } from "@reduxjs/toolkit/react";
import { smallUserCardDimentionSliceReducer } from "@/lib/features/smallUserCardDimention/smallUserCardDimentionSlice";
import { boards } from "@/lib/features/boardsSlice/boardSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      smallUserCardDimention: smallUserCardDimentionSliceReducer,
      boards: boards,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
