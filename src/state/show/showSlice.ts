// showSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IShow } from "../../lib/interfaces";

interface ShowState {
  isLoading: boolean;
  show: IShow | null;
  error: string | null | unknown;
}

const initialState: ShowState = {
  isLoading: false,
  show: null,
  error: null,
};

const showSlice = createSlice({
  name: "show",
  initialState,
  reducers: {
    fetchShowStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchShowSuccess(state, action: PayloadAction<IShow>) {
      state.isLoading = false;
      state.show = action.payload;
    },
    fetchShowFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchShowStart, fetchShowSuccess, fetchShowFailure } =
  showSlice.actions;
export default showSlice.reducer;
