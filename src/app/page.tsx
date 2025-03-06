"use client";

import Spinner from "@/components/Spinner";
import Link from "next/link";
import Image from "next/image";
import { useArticlesContext } from "./context/ArticlesContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const { articles, loading, error } = useArticlesContext();
  const router = useRouter();
  if (loading) return <Spinner />;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        NY Times Most Popular Articles
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => {
          const imageUrl =
            article.media?.[0]?.["media-metadata"]?.[1]?.url || null;

          return (
            <div
              key={article.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="relative w-full h-48 flex items-center justify-center bg-gray-200 text-gray-500 text-sm">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={article.title}
                    layout="fill"
                    className="cursor-pointer"
                    objectFit="cover"
                    onClick={() => router.push(`/article/${article.id}`)}
                  />
                ) : (
                  <span>No preview available</span>
                )}
              </div>

              <div className="p-4">
                <h2 className="text-lg font-semibold">{article.title}</h2>
                <p className="text-gray-600">{article.byline}</p>
                <Link
                  href={`/article/${article.id}`}
                  data-testid={`view-details-${article.id}`}
                  className="text-blue-500 mt-2 inline-block"
                >
                  View Details →
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
