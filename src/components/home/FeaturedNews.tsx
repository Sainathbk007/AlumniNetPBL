import React from 'react';
import { Link } from 'react-router-dom';
import { newsArticles } from '../../data/mockData';

const FeaturedNews: React.FC = () => {
  // Get latest news articles
  const latestNews = newsArticles.slice(0, 3);

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Latest News
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Stay updated with the latest happenings in our community
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {latestNews.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {article.imageUrl && (
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
              )}
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                    {article.category}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(article.postedAt).toLocaleDateString()}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {article.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.content}
                </p>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600">By {article.author}</span>
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
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/news"
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 shadow"
          >
            View All News
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedNews;