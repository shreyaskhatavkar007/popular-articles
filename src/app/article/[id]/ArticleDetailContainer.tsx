"use client";

import { useParams } from "next/navigation";
import Spinner from "@/components/Spinner";
import Image from "next/image";
import { useState } from "react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { useArticlesContext } from "@/app/context/ArticlesContext";

export default function ArticleDetailContainer() {
  const { id } = useParams();
  const { articles, loading } = useArticlesContext();
  const [showIframe, setShowIframe] = useState(false);

  if (loading) return <Spinner />;

  const article = articles.find((item) => item.id === Number(id));

  if (!article) return <p className="text-center mt-10">Article not found.</p>;

  const { title, byline, abstract, url } = article;
  const imageUrl = article.media?.[0]?.["media-metadata"]?.[2]?.url || null;

  return (
    <div className="flex gap-1 flex-row h-screen bg-gray-100 p-6">
      <div
        className={`max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md h-fit ${showIframe ? "w-[30%]" : ""}`}
      >
        <div className="relative w-full h-64 flex items-center justify-center bg-gray-200 text-gray-500 text-sm">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          ) : (
            <span>No preview available</span>
          )}
        </div>

        <h1 className="text-2xl font-bold mt-4">{title}</h1>
        <p className="text-gray-600">{byline}</p>
        <p className="mt-4">{abstract}</p>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowIframe(true)}
            className="text-blue-500 mt-4 inline-block cursor-pointer"
          >
            Read full article
          </button>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 mt-4 inline-block"
          >
            <ArrowTopRightOnSquareIcon className="h-5 w-5" />
          </a>
        </div>
      </div>

      {showIframe && (
        <div className="flex-1 rounded-lg shadow-md">
          <iframe
            src={url}
            className="w-full h-full"
            frameBorder="0"
            title="Full Article"
          ></iframe>
        </div>
      )}
    </div>
  );
}
