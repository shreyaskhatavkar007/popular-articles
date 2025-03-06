import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "-";
const BASE_URL = "https://api.nytimes.com/svc/mostpopular/v2/viewed";

export interface Article {
  id: number;
  title: string;
  byline: string;
  media: { type: string; "media-metadata": { url: string }[] }[];
  abstract: string;
  url: string;
}

export const fetchArticles = async (period: number = 7): Promise<Article[]> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/${period}.json?api-key=${API_KEY}`,
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
};
