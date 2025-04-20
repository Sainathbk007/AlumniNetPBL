import React from 'react';
import { Link } from 'react-router-dom';
import { NewsArticle } from '../../types';

interface NewsCardProps {
  article: NewsArticle;
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  // Format the posted date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transition duration-300 hover:shadow-lg">
      {article.imageUrl && (
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-48 object-cover"
        />
      )}
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
            {article.category}
          </span>
          <span className="text-xs text-gray-500">
            {formatDate(article.postedAt)}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {article.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {article.content}
        </p>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-sm text-gray-600">
              By {article.author} • {article.authorRole === 'alumni' ? 'Alumni' : article.authorRole === 'admin' ? 'Admin' : 'Student'}
            </span>
          </div>
          
          <Link
            to={`/news/${article.id}`}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;