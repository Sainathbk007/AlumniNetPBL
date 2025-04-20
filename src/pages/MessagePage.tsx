import React from 'react';
import { useParams } from 'react-router-dom';

const MessagePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Messages with User {userId}</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        {/* Add your messaging UI here */}
        <p>Start a conversation with your mentor or mentee.</p>
      </div>
    </div>
  );
};

export default MessagePage;