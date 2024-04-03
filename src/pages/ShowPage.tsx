import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button } from "@mantine/core";
import { IconArrowRight, IconPhoto } from "@tabler/icons-react";
import { DEFAULT_SHOW, HTML_REMOVER_REGEX } from "../constants/constants";
import { useShowQuery } from "../hooks/useShowQuery";
import {
  fetchShowFailure,
  fetchShowStart,
  fetchShowSuccess,
} from "../state/show/showSlice";

import EpisodeContainer from "../components/EpisodeContainer";
import NavigationButton from "../components/NavigationButton";
import { IEpisodeFromShow } from "../lib/interfaces";

const PRE_DEFINED_LENGTH_OF_EPISODES_TO_FETCH = 4;

const ShowPage: React.FC = () => {
  const [search, setSearch] = useState<string>(DEFAULT_SHOW);
  const [displayedEpisodes, setDisplayedEpisodes] = useState<
    IEpisodeFromShow[]
  >([]);
  const [startIndex, setStartIndex] = useState<number>(0);
  const { isLoading, data: show, refetch } = useShowQuery(search);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchShowStart());
      try {
        const result = await refetch();
        if (!result) dispatch(fetchShowFailure("Show data not found"));
        if (result.data) dispatch(fetchShowSuccess(result.data));
      } catch (error) {
        dispatch(fetchShowFailure((error as Error).message));
      }
    };

    fetchData();
  }, [dispatch, refetch]);

  useEffect(() => {
    if (show) {
      setDisplayedEpisodes(show._embedded?.episodes.slice(0, 4) ?? []);
    }
  }, [show]);

  const handleSearch = () => {
    setSearch(search);
    refetch();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      refetch();
    }
  };

  const handleNext = (forward: boolean) => {
    if (show) {
      const episodesLength = show._embedded?.episodes.length || 0;

      const newIndex = forward
        ? Math.min(
            startIndex + PRE_DEFINED_LENGTH_OF_EPISODES_TO_FETCH,
            episodesLength - PRE_DEFINED_LENGTH_OF_EPISODES_TO_FETCH
          )
        : Math.max(startIndex - PRE_DEFINED_LENGTH_OF_EPISODES_TO_FETCH, 0);

      const nextEpisodes =
        show._embedded?.episodes.slice(
          newIndex,
          newIndex + PRE_DEFINED_LENGTH_OF_EPISODES_TO_FETCH
        ) ?? [];

      setStartIndex(newIndex);
      setDisplayedEpisodes(nextEpisodes);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  const ShowHeaderInformation: React.FC = () => {
    return (
      <>
        <h2 className="mb-4 text-balance text-3xl font-extrabold text-white md:text-5xl">
          Insert Show Name below
        </h2>
        <div className="flex flex-row justify-center gap-4">
          <input
            className="px-4 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500"
            type="text"
            value={search}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
          />
          <Button
            variant="dark"
            leftSection={<IconPhoto size={14} />}
            rightSection={<IconArrowRight size={14} />}
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>
      </>
    );
  };

  const NameSummaryShowInformation: React.FC = () => {
    return (
      <>
        <h1 className="mt-2 text-2xl font-bold text-white">{show?.name}</h1>
        <h3 className="mt-3 text-md font-medium text-gray-400 ">
          {show?.summary.replace(HTML_REMOVER_REGEX, "")}
        </h3>
      </>
    );
  };

  return (
    <div className="mx-auto flex min-h-dvh w-full min-w-[320px] flex-col bg-gray-100">
      <main id="page-content" className="flex max-w-full flex-auto flex-col">
        <div className="bg-gray-900">
          <div className="container mx-auto px-4 pt-16 lg:px-8 lg:pt-32 xl:max-w-6xl">
            <div className="text-center">
              <ShowHeaderInformation />
              <NameSummaryShowInformation />
            </div>
            <div className="relative mx-5 my-5 rounded-xl bg-white p-2 shadow-lg">
              <div className="w-full bg-gray-200">
                <img
                  alt=""
                  className="mx-auto rounded-lg"
                  src={show?.image?.medium}
                />
              </div>
            </div>
          </div>
          <section className="bg-gray-50 flex flex-row pb-10">
            <div className="flex items-center mx-10">
              <NavigationButton
                direction="left"
                onClick={() => handleNext(false)}
              />
            </div>
            <div className="mx-auto">
              <div className="grid max-w-md grid-cols-1 gap-6 mx-auto lg:mt-16 lg:grid-cols-4 lg:max-w-full">
                {displayedEpisodes.map((episode: IEpisodeFromShow) => (
                  <div key={episode.id} className="flex h-10xl min-w-72">
                    <EpisodeContainer showName={show?.name} episode={episode} />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center mx-10">
              <NavigationButton
                direction="right"
                onClick={() => handleNext(true)}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ShowPage;
