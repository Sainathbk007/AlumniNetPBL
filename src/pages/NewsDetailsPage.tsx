import React from 'react';
import { useParams } from 'react-router-dom';
import { newsArticles } from '../data/mockData';

const NewsDetailsPage: React.FC = () => {
  const { newsId } = useParams<{ newsId: string }>();
  const article = newsId 
    ? newsArticles.find((news) => String(news.id) === newsId) 
    : undefined;

  if (!article) {
    return <p className="text-center text-lg text-gray-600">News article not found.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">{article.title}</h1>
      <p className="text-sm text-gray-600 mb-4">
        {new Date(article.postedAt).toLocaleDateString()} - {article.category}
      </p>
      <p className="text-gray-700">{article.content}</p>
    </div>
  );
};

export default NewsDetailsPage;