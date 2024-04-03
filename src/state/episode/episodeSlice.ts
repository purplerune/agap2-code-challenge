import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEpisodeFromShow } from "../../lib/interfaces";

interface EpisodeState {
  isLoading: boolean;
  episode: IEpisodeFromShow | null;
  error: string | null | unknown;
}

const initialState: EpisodeState = {
  isLoading: false,
  episode: null,
  error: null,
};

const episodeSlice = createSlice({
  name: "episode",
  initialState,
  reducers: {
    fetchEpisodeStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchEpisodeSuccess(state, action: PayloadAction<IEpisodeFromShow>) {
      state.isLoading = false;
      state.episode = action.payload;
    },
    fetchEpisodeFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchEpisodeStart, fetchEpisodeSuccess, fetchEpisodeFailure } =
  episodeSlice.actions;
export default episodeSlice.reducer;
