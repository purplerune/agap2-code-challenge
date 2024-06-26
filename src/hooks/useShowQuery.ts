import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { IShow } from "../lib/interfaces";
import { fetchEpisodesFromShowInformation } from "../services/episodeAPI";
import {
  fetchShowFailure,
  fetchShowStart,
  fetchShowSuccess,
} from "../state/show/showSlice";

/**
 * Hook Responsible for fetching Show
 *
 * @param {string} search search query string params
 * @returns {useQuery} React useQuery
 */
export const useShowQuery = (search: string) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchShowStart());
  }, [dispatch, search]);

  return useQuery<IShow>({
    queryKey: ["show"],
    queryFn: async () => {
      try {
        const data = await fetchEpisodesFromShowInformation(search);
        if (!data) dispatch(fetchShowFailure("Invalid Query Params"));
        if (data) dispatch(fetchShowSuccess(data));
        return data;
      } catch (error) {
        dispatch(fetchShowFailure((error as Error).message));
      }
    },
    staleTime: Infinity,
    enabled: false,
  });
};
