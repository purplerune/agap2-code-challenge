// NameSummaryShowInformation.tsx
import React from "react";

interface NameSummaryShowInformationProps {
  showName: string | undefined;
  summary: string | undefined;
}

const NameSummaryShowInformation: React.FC<NameSummaryShowInformationProps> = ({
  showName,
  summary,
}) => {
  return (
    <>
      <h1 className="mt-2 text-2xl font-bold text-white">{showName}</h1>
      <h3 className="mt-3 text-md font-medium text-gray-400 ">{summary}</h3>
    </>
  );
};

export default NameSummaryShowInformation;
