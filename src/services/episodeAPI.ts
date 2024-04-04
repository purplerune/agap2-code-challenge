import axios from "axios";
import { API_BASE_URL } from "../constants/constants";
import { IShow, IEpisodeFromShow } from "../lib/interfaces";

export const fetchSingleEpisode = async (
  episodeId: number
): Promise<IEpisodeFromShow | any> => {
  const URL = `${API_BASE_URL}/episodes/${episodeId}`;
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching the episodes from the Show:", error);
    return null;
  }
};

export const fetchShowInformation = async (
  episodeName: string
): Promise<IShow | any> => {
  const URL = `${API_BASE_URL}/singlesearch/shows?q=${episodeName}`;
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching show information:", error);
    return null;
  }
};

export const fetchEpisodesFromShowInformation = async (
  episodeName: string
): Promise<IShow | any> => {
  const URL = `${API_BASE_URL}/singlesearch/shows?q=${episodeName}&embed=episodes`;
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching the episodes from the Show:", error);
    return null;
  }
};
