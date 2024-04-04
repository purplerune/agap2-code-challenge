import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import EpisodeContainer from "../../components/EpisodeContainer";
import NavigationButton from "../../components/NavigationButton";
import { DEFAULT_SHOW, HTML_REMOVER_REGEX } from "../../constants/constants";
import { useShowQuery } from "../../hooks/useShowQuery";
import { IEpisodeFromShow } from "../../lib/interfaces";
import {
  fetchShowFailure,
  fetchShowStart,
  fetchShowSuccess,
} from "../../state/show/showSlice";
import NameSummaryShowInformation from "./Components/NameSummaryShowInformation";
import ShowHeaderInformation from "./Components/ShowHeaderInformation";

const PRE_DEFINED_LENGTH_OF_EPISODES_TO_FETCH = 3;

/**
 * This component renders the TV Show Page
 * @returns {ReactNode} A React element that renders the Show Page
 */
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
        if (result.data) dispatch(fetchShowSuccess(result.data));
      } catch (error) {
        dispatch(fetchShowFailure((error as Error).message));
      }
    };
    fetchData();
  }, [dispatch, refetch]);

  useEffect(() => {
    if (show) {
      setDisplayedEpisodes(
        show._embedded?.episodes.slice(
          0,
          PRE_DEFINED_LENGTH_OF_EPISODES_TO_FETCH
        ) ?? []
      );
    }
  }, [show]);

  const handleSearch = async () => {
    try {
      setSearch(search);
      await refetch();
    } catch (error: any) {}
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      try {
        const result = await refetch();
        if (result.data) dispatch(fetchShowSuccess(result.data));
      } catch (error: any) {
        dispatch(fetchShowFailure("Show data not found"));
      }
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

  return (
    <>
      <div className="mx-auto flex min-h-dvh w-full min-w-[320px] flex-col bg-gray-100">
        <main id="page-content" className="flex max-w-full flex-auto flex-col">
          <div className="bg-gray-900">
            <div className="container mx-auto px-4 pt-16 lg:px-8 lg:pt-32 xl:max-w-6xl">
              <div className="text-center">
                <ShowHeaderInformation
                  search={search}
                  handleInputChange={handleInputChange}
                  handleKeyPress={handleKeyPress}
                  handleSearch={handleSearch}
                />
                <NameSummaryShowInformation
                  showName={show?.name}
                  summary={show?.summary.replace(HTML_REMOVER_REGEX, "")}
                />
              </div>
              {show && (
                <div className="relative mx-5 my-5 rounded-xl bg-white p-2 shadow-lg">
                  <div className="w-full bg-gray-200">
                    <img
                      alt=""
                      className="mx-auto rounded-lg"
                      src={show?.image?.medium}
                    />
                  </div>
                </div>
              )}
            </div>
            {show && (
              <section className="bg-gray-50 flex flex-row pb-10">
                <div className="flex items-center mx-10">
                  <NavigationButton
                    direction="left"
                    onClick={() => handleNext(false)}
                  />
                </div>
                <div className="mx-auto">
                  <div className="grid max-w-md grid-cols-1 gap-6 mx-auto lg:mt-16 lg:grid-cols-3 lg:max-w-full">
                    {displayedEpisodes.map((episode: IEpisodeFromShow) => (
                      <div key={episode.id} className="flex h-10xl min-w-72">
                        <EpisodeContainer
                          showName={show?.name}
                          episode={episode}
                        />
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
            )}
          </div>
        </main>
      </div>
      <Toaster />
    </>
  );
};

export default ShowPage;
