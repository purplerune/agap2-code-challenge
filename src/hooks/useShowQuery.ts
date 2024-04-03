// useShowQuery.ts
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { fetchShowInformation } from "../services/episodeAPI";
import { useEffect } from "react";

import { IShow } from "../lib/interfaces";
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
        const data = await fetchShowInformation(search);
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
