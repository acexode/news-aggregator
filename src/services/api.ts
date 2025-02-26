import axios from 'axios';
import { Article } from '../types/article';

const NEWS_API_KEY = 'b6c89ec81df84cecadedd448cabd30f8'; // Replace with your API key
const GUARDIAN_API_KEY = 'bfbb077a-6adf-4fd7-a805-2fdcce1e5c65'; // Replace with your API key
const NYT_API_KEY = 'hd0AQbp7b81QIoFlnSrnk51PatMGFIoU'; // Replace with your API key

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
  sources?: string,
  category?: string,
  date?: string
): Promise<Article[]> => {
  let url = `https://newsapi.org/v2/everything?apiKey=${NEWS_API_KEY}`;
  if (query) url += `&q=${query}`;
//   if (sources) url += `&sources=${sources}`;
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
      description: article.webTitle, // Guardian doesn't have a direct description field.
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
