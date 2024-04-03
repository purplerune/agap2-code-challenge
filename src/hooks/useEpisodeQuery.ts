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

/**
 * Hook Responsible for fetching Episode
 *
 * @param {number} episodeId episodeId
 * @returns {useQuery} React useQuery
 */
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
