import { Button } from "@mantine/core";
import { IconArrowRight, IconPhoto } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { DEFAULT_SHOW, HTML_REMOVER_REGEX } from "../constants/constants";
import { useShowQuery } from "../hooks/useShowQuery";
import { useDispatch } from "react-redux";
import { fetchShowFailure, fetchShowStart } from "../state/show/showSlice";

export const Show = () => {
  const [search, setSearch] = useState(DEFAULT_SHOW);
  const { isLoading, data: show, refetch } = useShowQuery(search);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchShowStart());
      try {
        await refetch();
      } catch (error) {
        dispatch(fetchShowFailure((error as Error).message));
      }
    };

    fetchData();
  }, [dispatch, refetch]);

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

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className="mx-auto flex min-h-dvh w-full min-w-[320px] flex-col bg-gray-100">
        <main id="page-content" className="flex max-w-full flex-auto flex-col">
          <div className="bg-gray-900">
            <div className="container mx-auto px-4 pt-16 lg:px-8 lg:pt-32 xl:max-w-6xl">
              <div className="text-center">
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
                <h3 className="mt-3 text-md font-medium text-gray-400 ">
                  {show?.summary.replace(HTML_REMOVER_REGEX, "")}
                </h3>
              </div>
              <div className="flex justify-center pb-16 pt-10">
                <Button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-blue-800 bg-blue-800 px-6 py-4 font-semibold leading-6 text-white hover:border-blue-700/50 hover:bg-blue-700/50 hover:text-white focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50 active:border-blue-700 active:bg-blue-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    data-slot="icon"
                    className="hi-mini hi-arrow-right inline-block size-5 opacity-50"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span>Get Started</span>
                </Button>
              </div>
              <div className="relative mx-5 -mb-20 rounded-xl bg-white p-2 shadow-lg sm:-mb-40 lg:mx-32">
                <div className="aspect-w-16 aspect-h-10 w-full bg-gray-200">
                  <img
                    src={show?.image?.medium}
                    alt=""
                    className="mx-auto rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};
