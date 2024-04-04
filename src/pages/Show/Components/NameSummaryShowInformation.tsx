// NameSummaryShowInformation.tsx
import React from "react";
import styled from "@emotion/styled";

interface NameSummaryShowInformationProps {
  showName: string | undefined;
  summary: string | undefined;
}

const Summary = styled.h3`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 8;
  -webkit-box-orient: vertical;
`;

const NameSummaryShowInformation: React.FC<NameSummaryShowInformationProps> = ({
  showName,
  summary,
}) => {
  return (
    <>
      <h1 className="mt-2 text-2xl font-bold text-white">{showName}</h1>
      <Summary className="mt-3 text-md font-medium text-gray-400 ">
        {summary}
      </Summary>
    </>
  );
};

export default NameSummaryShowInformation;
