import React from "react";
import { HTML_REMOVER_REGEX } from "../../constants/constants";
import { IEpisodeFromShow } from "../../lib/interfaces";

interface EpisodeContainerProps {
  episode: IEpisodeFromShow;
}

const EpisodeContainer: React.FC<EpisodeContainerProps> = ({ episode }) => {
  return (
    <div className="overflow-hidden bg-white rounded shadow">
      <div className="p-5">
        <div className="relative">
          <a
            href={episode?.url}
            title={episode?.name}
            className="block aspect-w-4 aspect-h-3"
          >
            <img
              className="object-cover w-full h-full"
              src={episode?.image?.medium}
              alt={episode?.name}
            />
          </a>

          <div className="absolute top-4 left-4">
            <span className="px-4 py-2 text-xs font-semibold tracking-widest text-gray-900 uppercase bg-white rounded-full">
              {episode?.type}
            </span>
          </div>
        </div>
        <span className="block mt-6 text-sm font-semibold tracking-widest text-gray-500 uppercase">
          {episode?.airdate}
        </span>
        <p className="mt-5 text-2xl font-semibold">
          <a href={episode?.url} title={episode?.name} className="text-black">
            {episode?.name}
          </a>
        </p>
        <p className="mt-4 text-base text-gray-600">
          {episode?.summary?.replace(HTML_REMOVER_REGEX, "")}
        </p>
        <a
          href={episode?.url}
          title=""
          className="inline-flex items-center justify-center pb-0.5 mt-5 text-base font-semibold text-blue-600 transition-all duration-200 border-b-2 border-transparent hover:border-blue-600 focus:border-blue-600"
        >
          Continue Reading
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default EpisodeContainer;
