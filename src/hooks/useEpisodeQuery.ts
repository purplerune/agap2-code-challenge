import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { IEpisodeFromShow } from "../lib/interfaces";
import { fetchSingleEpisode } from "../services/episodeAPI";
import {
  fetchEpisodeFailure,
  fetchEpisodeStart,
  fetchEpisodeSuccess,
} from "../state/episode/episodeSlice";

export const useEpisodeQuery = (episodeId: number) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEpisodeStart());
  }, [dispatch, episodeId]);

  return useQuery<IEpisodeFromShow>({
    queryKey: ["episode", { episodeId }],
    queryFn: async () => {
      try {
        const data = await fetchSingleEpisode(episodeId);
        dispatch(fetchEpisodeSuccess(data));
        return data;
      } catch (error) {
        dispatch(fetchEpisodeFailure((error as Error).message));
        throw error;
      }
    },
    staleTime: Infinity,
    enabled: false,
  });
};
