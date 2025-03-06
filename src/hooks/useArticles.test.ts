import { renderHook, act } from "@testing-library/react";
import { expect } from "@jest/globals";
import useArticles from "@/hooks/useArticles";
import { fetchArticles } from "@/lib/api";

jest.mock("@/lib/api", () => ({
  fetchArticles: jest.fn(),
}));

const mockArticles = [
  {
    id: 1,
    title: "Article 1",
    byline: "Author 1",
    abstract: "Abstract 1",
    url: "http://example.com/1",
  },
  {
    id: 2,
    title: "Article 2",
    byline: "Author 2",
    abstract: "Abstract 2",
    url: "http://example.com/2",
  },
];

describe("useArticles", () => {
  it("should fetch and set articles", async () => {
    (fetchArticles as jest.Mock).mockResolvedValue(mockArticles);

    const { result } = renderHook(() => useArticles(7));

    expect(result.current.loading).toBe(true);

    await act(async () => {});

    expect(result.current.articles).toEqual(mockArticles);
    expect(result.current.loading).toBe(false);
  });

  it("should handle API errors", async () => {
    (fetchArticles as jest.Mock).mockRejectedValue(new Error("API Error"));

    const { result } = renderHook(() => useArticles(7));

    await act(async () => {});

    expect(result.current.articles).toEqual([]);
    expect(result.current.loading).toBe(false);
  });
});
