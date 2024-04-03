import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { useEpisodeQuery } from "../hooks/useEpisodeQuery";
import {
  fetchEpisodeFailure,
  fetchEpisodeStart,
  fetchEpisodeSuccess,
} from "../state/episode/episodeSlice";
import { HTML_REMOVER_REGEX } from "../constants/constants";

/**
 * Page regarding Episode
 * @returns {ReactNode} A React element that renders the Page Episode
 */
export const EpisodePage: React.FC = () => {
  const params = useParams<{ showName: string; episodeId: string }>();
  const episodeIdNumber = parseInt(params.episodeId || "");
  const {
    isLoading,
    data: episode,
    refetch,
  } = useEpisodeQuery(episodeIdNumber);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchEpisodeStart());
      try {
        const result = await refetch();
        if (!result) dispatch(fetchEpisodeFailure("Show data not found"));
        if (result.data) dispatch(fetchEpisodeSuccess(result.data));
      } catch (error) {
        dispatch(fetchEpisodeFailure((error as Error).message));
      }
    };

    fetchData();
  }, [dispatch, refetch]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <section className="pt-10 overflow-hidden bg-gray-50 h-screen ">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 ">
        <div className="flex flex-col items-center gap-5 ">
          <div>
            <h2 className="text-5xl font-bold leading-tight text-black ">
              {episode?.name}
            </h2>
            <p className="max-w-lg mt-3 text-xl leading-relaxed text-gray-600 md:mt-8">
              {episode?.summary.replace(HTML_REMOVER_REGEX, "")}
            </p>
          </div>
          <img
            className="relative  xl:max-w-lg xl:mx-auto 2xl:origin-bottom 2xl:scale-110"
            src={episode?.image?.medium}
            alt=""
          />

          <Link to={`/`} className="text-blue-500">
            Go Back to Show
          </Link>
        </div>
      </div>
    </section>
  );
};
