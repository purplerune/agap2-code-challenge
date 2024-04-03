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

export const useShowQuery = (search: string) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchShowStart());
  }, [dispatch, search]);

  return useQuery<IShow>({
    queryKey: ["show", { search }],
    queryFn: async () => {
      try {
        const data = await fetchEpisodesFromShowInformation(search);
        dispatch(fetchShowSuccess(data));
        return data;
      } catch (error) {
        dispatch(fetchShowFailure((error as Error).message));
        throw error;
      }
    },
    staleTime: Infinity,
    enabled: false,
  });
};
