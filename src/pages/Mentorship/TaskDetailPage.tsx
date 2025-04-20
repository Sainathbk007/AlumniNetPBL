import React from 'react';
import { useParams } from 'react-router-dom';
import { tasks } from '../../data/mockData';

const TaskDetailsPage: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return <p className="text-center text-lg text-gray-600">Task not found.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">{task.title}</h1>
      <p className="text-gray-600 mb-4">{task.description}</p>
      <p className="text-sm text-gray-500">
        Due Date: {new Date(task.dueDate).toLocaleDateString()}
      </p>
      <p className="text-sm text-gray-500">
        Status: {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
      </p>
    </div>
  );
};

export default TaskDetailsPage;