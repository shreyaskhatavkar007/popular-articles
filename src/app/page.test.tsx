import { render, screen } from "@testing-library/react";
import Home from "@/app/page";
import { expect } from "@jest/globals";
import { ArticlesProvider } from "./context/ArticlesContext";
import useArticles from "@/hooks/useArticles";

jest.mock("@/hooks/useArticles");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockArticles = [
  {
    id: 1,
    title: "Article 1",
    byline: "Author 1",
    abstract: "Abstract 1",
    url: "http://example.com/1",
    media: [
      {
        type: "image",
        "media-metadata": [{ url: "http://example.com/image1.jpg" }],
      },
    ],
  },
  {
    id: 2,
    title: "Article 2",
    byline: "Author 2",
    abstract: "Abstract 2",
    url: "http://example.com/2",
  },
];

const renderWithProvider = (value: any) => {
  return render(
    <ArticlesProvider value={value}>
      <Home />
    </ArticlesProvider>,
  );
};

describe("Home Page", () => {
  it("renders loading state", () => {
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

  it("renders error state", () => {
    const mockObj = {
      articles: [],
      loading: false,
      error: "Failed to fetch",
    };
    (useArticles as jest.Mock).mockReturnValue(mockObj);

    renderWithProvider(mockObj);
    expect(screen.getByText("Failed to fetch")).toBeInTheDocument();
  });

  it("renders articles correctly", () => {
    const mockObj = {
      articles: mockArticles,
      loading: false,
      error: null,
    };
    (useArticles as jest.Mock).mockReturnValue(mockObj);
    renderWithProvider(mockObj);

    expect(
      screen.getByText("NY Times Most Popular Articles"),
    ).toBeInTheDocument();
    expect(screen.getByText(mockArticles[0].title)).toBeInTheDocument();
    expect(screen.getByText(mockArticles[1].title)).toBeInTheDocument();

    const link1 = screen.getByTestId(`view-details-${mockArticles[0].id}`);
    expect(link1).toHaveAttribute("href", `/article/${mockArticles[0].id}`);

    const link2 = screen.getByTestId(`view-details-${mockArticles[1].id}`);
    expect(link2).toHaveAttribute("href", `/article/${mockArticles[1].id}`);
  });
});
