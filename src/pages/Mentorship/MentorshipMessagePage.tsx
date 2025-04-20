import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const MentorshipMessagePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>(); // Get the userId from the URL
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, newMessage]);
      setNewMessage('');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Messages with User {userId}</h1>
      <div className="space-y-4">
        {/* Messages Section */}
        <div className="border p-4 rounded-md h-64 overflow-y-auto">
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <div key={index} className="mb-2">
                <p className="text-gray-800">{msg}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No messages yet.</p>
          )}
        </div>

        {/* Input Section */}
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border-gray-300 rounded-md shadow-sm"
          />
          <button
            onClick={handleSendMessage}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default MentorshipMessagePage;