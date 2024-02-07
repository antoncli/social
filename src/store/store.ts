import { configureStore } from "@reduxjs/toolkit/react";
import { boards } from "@/store/features/boardsSlice/boardSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      boards: boards,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
