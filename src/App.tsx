import './App.css'
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ArticleCard from './components/ArticleCard';
import SearchFilter from './components/SearchFilter';
import { fetchNewsAPIArticles, fetchGuardianArticles, fetchNYTArticles } from './services/api';
import { Article } from './types/article';

function App() {
  const [searchParams, setSearchParams] = useState({
    query: '',
    sources: '',
    category: '',
    date: ''
  });

  const { data: articles = [], isLoading, isError } = useQuery({
    queryKey: ['articles', searchParams],
    queryFn: async () => {
      const { query, sources, category, date } = searchParams;
      let allArticles: Article[] = [];

      if (sources === '' || sources.includes('newsapi')) {
        const newsApiResults = await fetchNewsAPIArticles(query, sources, category, date);
        allArticles = [...allArticles, ...newsApiResults];
      }
      if (sources === '' || sources.includes('guardian')) {
        const guardianResults = await fetchGuardianArticles(query, category, date);
        allArticles = [...allArticles, ...guardianResults];
      }
      if (sources === '' || sources.includes('nytimes')) {
        const nytResults = await fetchNYTArticles(query, category, date);
        allArticles = [...allArticles, ...nytResults];
      }

      return allArticles;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false
  });

  const handleSearch = (query: string, sources: string, category: string, date: string) => {
    setSearchParams({ query, sources, category, date });
  };

  return (
    <div className="min-h-screen px-4 py-2">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          News Aggregator
        </h1>
        <SearchFilter onSearch={handleSearch} />
        {isLoading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-2 text-gray-600">Loading articles...</p>
          </div>
        )}

        {isError && (
          <div className="text-center text-red-600 py-8">
            Error loading articles. Please try again later.
          </div>
        )}

        {!isLoading && !isError && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {articles.map((article, index) => (
              <ArticleCard key={`${article.title}-${index}`} article={article} />
            ))}
          </div>
        )}

        {!isLoading && !isError && articles.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            No articles found. Try adjusting your search criteria.
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
