import { render, screen } from "@testing-library/react";
import ArticleDetailContainer from "./ArticleDetailContainer";
import { expect } from "@jest/globals";
import { useParams } from "next/navigation";
import { ArticlesProvider } from "@/app/context/ArticlesContext";
import useArticles from "@/hooks/useArticles";

jest.mock("@/hooks/useArticles");
jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
}));

const mockArticle = {
  id: 1,
  media: [
    {
      type: "image",
      "media-metadata": [
        { url: "http://example.com/1" },
        { url: "http://example.com/2" },
        { url: "http://example.com/3" },
      ],
    },
  ],
  title: "Article 1",
  byline: "Author 1",
  abstract: "Abstract 1",
  url: "http://example.com/1",
};

const renderWithProvider = (value: any) => {
  return render(
    <ArticlesProvider value={value}>
      <ArticleDetailContainer />
    </ArticlesProvider>,
  );
};

describe("ArticleDetailContainer", () => {
  it("renders loading state", () => {
    (useParams as jest.Mock).mockReturnValue({ id: "1" });
    const mockObj = {
      articles: [],
      loading: true,
      error: null,
    };
    (useArticles as jest.Mock).mockReturnValue(mockObj);

    renderWithProvider(mockObj);

    const loadingElement = document.querySelector(".animate-spin");
    expect(loadingElement).toBeInTheDocument();
  });

  it("renders article details when data is available", () => {
    (useParams as jest.Mock).mockReturnValue({ id: "1" });

    const mockObj = {
      articles: [mockArticle],
      loading: false,
      error: null,
    };
    (useArticles as jest.Mock).mockReturnValue(mockObj);

    renderWithProvider(mockObj);

    const imgElement = document.querySelector("img");
    expect(imgElement).toBeInTheDocument();
    expect(screen.getByText(mockArticle.title)).toBeInTheDocument();
    expect(screen.getByText(mockArticle.byline)).toBeInTheDocument();
    expect(screen.getByText(mockArticle.abstract)).toBeInTheDocument();
  });

  it("renders not found message for invalid id", () => {
    (useParams as jest.Mock).mockReturnValue({ id: "999" });

    const mockObj = {
      articles: [mockArticle],
      loading: false,
      error: null,
    };
    (useArticles as jest.Mock).mockReturnValue(mockObj);

    renderWithProvider(mockObj);

    expect(screen.getByText("Article not found.")).toBeInTheDocument();
  });

  it("renders no preview available", () => {
    (useParams as jest.Mock).mockReturnValue({ id: "1" });

    const mockObj = {
      articles: [
        {
          id: 1,
          title: "Article 1",
          byline: "Author 1",
          abstract: "Abstract 1",
          url: "http://example.com/1",
        },
      ],
      loading: false,
      error: null,
    };
    (useArticles as jest.Mock).mockReturnValue(mockObj);

    renderWithProvider(mockObj);

    expect(screen.getByText("No preview available")).toBeInTheDocument();
  });
});
