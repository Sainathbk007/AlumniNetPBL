import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const AssignTaskPage: React.FC = () => {
  const { menteeId } = useParams<{ menteeId: string }>();
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    dueDate: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Task assigned to mentee:', menteeId, taskData);
    // Add logic to save the task to the backend
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Assign Task to Mentee {menteeId}</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Task Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={taskData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Task Description
          </label>
          <textarea
            id="description"
            name="description"
            value={taskData.description}
            onChange={handleChange}
            required
            rows={4}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
            Due Date
          </label>
          <input
            id="dueDate"
            name="dueDate"
            type="date"
            value={taskData.dueDate}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Assign Task
        </button>
      </form>
    </div>
  );
};

export default AssignTaskPage;