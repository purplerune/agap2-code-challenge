import { configureStore } from "@reduxjs/toolkit";
import showReducer from "./show/showSlice";
import episodeReducer from "./episode/episodeSlice";

export const store = configureStore({
  reducer: { show: showReducer, episode: episodeReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
