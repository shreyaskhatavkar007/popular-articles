import { useEffect, useState } from "react";
import { fetchArticles, Article } from "@/lib/api";

export default function useArticles(period: number = 7) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        const data = await fetchArticles(period);
        setArticles(data);
      } catch (err) {
        setError("Failed to fetch articles.");
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [period]);

  return { articles, loading, error };
}
