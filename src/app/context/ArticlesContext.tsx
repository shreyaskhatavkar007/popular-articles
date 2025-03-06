"use client";

import { createContext, useContext } from "react";
import useArticles from "@/hooks/useArticles";
import { Article } from "@/lib/api";

interface ArticlesContextType {
  articles: Article[];
  loading: boolean;
  error: string | null;
}

const ArticlesContext = createContext<ArticlesContextType | null>(null);

export function ArticlesProvider({ children }: { children: React.ReactNode }) {
  const { articles, loading, error } = useArticles();

  return (
    <ArticlesContext.Provider value={{ articles, loading, error }}>
      {children}
    </ArticlesContext.Provider>
  );
}

export function useArticlesContext() {
  const context = useContext(ArticlesContext);
  if (!context) {
    throw new Error(
      "useArticlesContext must be used within an ArticlesProvider",
    );
  }
  return context;
}
