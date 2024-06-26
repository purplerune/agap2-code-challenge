import React from "react";
import {
  HTML_REMOVER_REGEX,
  PLACEHOLDER_IMAGE,
} from "../../constants/constants";
import { IEpisodeFromShow } from "../../lib/interfaces";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

interface EpisodeContainerProps {
  episode: IEpisodeFromShow;
  showName: string | undefined;
}

const Summary = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 8;
  -webkit-box-orient: vertical;
`;

/**
 * This component renders the Episode information inside a container
 *
 * @param {string} episode the episode with all it's attributes
 * @param {string} showName The show's Name
 * @returns {ReactNode} A React element that renders Episode in a Container
 */
const EpisodeContainer: React.FC<EpisodeContainerProps> = ({
  episode,
  showName,
}) => {
  return (
    <div className="overflow-hidden bg-white rounded shadow w-full">
      <div className="p-5">
        <div className="relative">
          <img
            className="object-cover w-full h-full"
            src={episode?.image?.medium || PLACEHOLDER_IMAGE}
            alt={episode?.name}
          />
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
          <span title={episode?.name} className="text-black">
            {episode?.name}
          </span>
        </p>
        <Summary className="mt-4 text-base text-gray-600">
          {episode?.summary?.replace(HTML_REMOVER_REGEX, "")}
        </Summary>
        <Link
          key={episode?.url}
          to={`/episodes/${showName}/${episode?.id || ""}`}
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
        </Link>
      </div>
    </div>
  );
};

export default EpisodeContainer;
