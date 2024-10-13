import axios from "axios";
import { logger } from "../utils/logger";

type SearchProps = {
  imageSearch: boolean;
  page?: number;
};

export const handleSearch = async (
  query: string,
  { imageSearch = false, page = 1 }: SearchProps,
) => {
  const { GOOGLE_CUSTOM_SEARCH_API_KEY = "", GOOGLE_CUSTOM_SEARCH_ID = "" } =
    process.env;

  const queryParams = new URLSearchParams();
  queryParams.set("cx", GOOGLE_CUSTOM_SEARCH_ID);
  queryParams.set("key", GOOGLE_CUSTOM_SEARCH_API_KEY);
  queryParams.set("q", query);
  queryParams.set("num", "10");
  queryParams.set("start", page?.toString());
  if (imageSearch) {
    queryParams.set("searchType", "image");
  }

  const url = new URL(
    `https://customsearch.googleapis.com/customsearch/v1?${queryParams}`,
  );
  url.search = queryParams.toString();

  try {
    logger.info("searching...", { url });
    const response = await axios.get(url.toString());
    return response.data;
  } catch (error) {
    logger.error("error when getting search results", { error });
    throw error;
  }
};
