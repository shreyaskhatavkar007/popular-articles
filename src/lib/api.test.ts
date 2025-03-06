import axios from "axios";
import { fetchArticles } from "@/lib/api";
import { expect } from "@jest/globals";

jest.mock("axios");

describe("fetchArticles", () => {
  it("fetches articles successfully", async () => {
    const mockResponse = {
      data: {
        results: [
          {
            id: 1,
            title: "Article 1",
            byline: "By Author 1",
            abstract: "Abstract of article 1",
            url: "https://example.com/article1",
          },
        ],
      },
    };
    (axios.get as jest.Mock).mockResolvedValue(mockResponse);

    const articles = await fetchArticles(7);

    expect(articles).toEqual(mockResponse.data.results);
    expect(axios.get).toHaveBeenCalledWith(
      "https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json?api-key=JtMON1GCGjDMt85Ytupsgu7ayPGKeVIP",
    );
  });

  it("handles errors gracefully", async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error("Network Error"));

    const articles = await fetchArticles(7);

    expect(articles).toEqual([]);
    expect(axios.get).toHaveBeenCalledWith(
      "https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json?api-key=JtMON1GCGjDMt85Ytupsgu7ayPGKeVIP",
    );
  });
});
