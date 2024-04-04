// ShowHeaderInformation.tsx
import { Button } from "@mantine/core";
import { IconArrowRight, IconPhoto } from "@tabler/icons-react";
import React from "react";

interface ShowHeaderInformationProps {
  search: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleSearch: () => void;
}

const ShowHeaderInformation: React.FC<ShowHeaderInformationProps> = ({
  search,
  handleInputChange,
  handleKeyPress,
  handleSearch,
}) => {
  return (
    <>
      <h2 className="mb-4 text-balance text-3xl font-extrabold text-white md:text-5xl">
        Insert Show Name below
      </h2>
      <div className="flex flex-row justify-center gap-4">
        <input
          className="px-4 border border-gray-400 rounded-md  focus:border-blue-500"
          type="text"
          value={search}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
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

export default ShowHeaderInformation;
