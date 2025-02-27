import React from "react";
import { Article } from "../types/article";
import placeholderImage from "../assets/placeholder.png";
const ArticleCard: React.FC<{ article: Article }> = ({ article }) => {
  return (
    <div className="border rounded p-4 mb-4 shadow-md">
      {article.urlToImage && (
        <div className="relative w-full pt-[56.25%]">
          <img
            src={article.urlToImage || placeholderImage}
            alt={article.title}
            className="absolute top-0 left-0 w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;

              target.src = "/placeholder-image.jpg";
            }}
          />
        </div>
      )}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">{article?.source?.name}</span>

          <span className="text-sm text-gray-500">
            {new Date(article?.publishedAt).toLocaleDateString()}
          </span>
        </div>

        <h2 className="text-xl font-semibold mb-2 line-clamp-2">
          {article.title}
        </h2>

        <p className="text-gray-600 mb-4 line-clamp-3">{article.description}</p>

        <div className="mt-auto">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
            aria-label={`Read more about ${article.title}`}
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};
export default ArticleCard;
