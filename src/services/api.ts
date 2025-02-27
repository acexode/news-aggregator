import axios from 'axios';
import { Article } from '../types/article';

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const GUARDIAN_API_KEY = import.meta.env.VITE_GUARDIAN_API_KEY;
const NYT_API_KEY = import.meta.env.VITE_NYT_API_KEY;

interface NewsAPIArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: { name: string; id?: string };
  author?: string;
  content?: string;
  category?: string;
}

interface GuardianArticle {
  webTitle: string;
  webUrl: string;
  webPublicationDate: string;
}

interface NYTArticle {
  headline: { main: string };
  abstract: string;
  web_url: string;
  multimedia: Array<{ url: string }>;
  pub_date: string;
  byline?: { original: string };
  lead_paragraph: string;
  news_desk: string;
}

export const fetchNewsAPIArticles = async (
  query?: string,
  category?: string,
  date?: string
): Promise<Article[]> => {
  let url = `https://newsapi.org/v2/everything?apiKey=${NEWS_API_KEY}`;
  if (query) url += `&q=${query}`;
  if (category) url += `&category=${category}`;
  if (date) url += `&from=${date}`;

  const response = await axios.get(url);
  return response.data.articles.map((article: NewsAPIArticle) => ({
    title: article.title,
    description: article.description,
    url: article.url,
    urlToImage: article.urlToImage,
    publishedAt: article.publishedAt,
    source: { name: article.source.name, id: article.source.id },
    author: article.author,
    content: article.content,
    category: article.category,
  }));
};

export const fetchGuardianArticles = async (
    query?: string,
    section?: string,
    date?: string
  ): Promise<Article[]> => {
    let url = `https://content.guardianapis.com/search?api-key=${GUARDIAN_API_KEY}`;
    if (query) url += `&q=${query}`;
    if (section) url += `&section=${section}`;
    if (date) url += `&from-date=${date}`;
    const response = await axios.get(url);
    return response.data.response.results.map((article: GuardianArticle) => ({
      title: article.webTitle,
      description: article.webTitle,
      url: article.webUrl,
      publishedAt: article.webPublicationDate,
      source: { name: 'The Guardian' },
    }));
  };
  
  export const fetchNYTArticles = async (
      query?: string,
      section?: string,
      date?: string
  ): Promise<Article[]> => {
      let url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${NYT_API_KEY}`;
      if (query) url += `&q=${query}`;
      if (section) url += `&fq=news_desk:("${section}")`;
      if (date) url += `&begin_date=${date.replace(/-/g, '')}`;
  
      const response = await axios.get(url);
      return response.data.response.docs.map((article: NYTArticle) => ({
          title: article.headline.main,
          description: article.abstract,
          url: article.web_url,
          urlToImage: article.multimedia && article.multimedia.length > 0 ? `https://static01.nyt.com/${article.multimedia[0].url}` : undefined,
          publishedAt: article.pub_date,
          source: { name: 'The New York Times' },
          author: article.byline?.original,
          content: article.lead_paragraph,
          category: article.news_desk,
      }));
  };
