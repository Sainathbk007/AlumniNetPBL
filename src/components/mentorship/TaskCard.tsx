import React from 'react';
import { Task } from '../../types';
import { CheckCircle, Clock, Calendar } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onStatusChange: (taskId: string, status: 'assigned' | 'in-progress' | 'completed') => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onStatusChange }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'assigned':
        return 'bg-gray-100 text-gray-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const isDueSoon = () => {
    const dueDate = new Date(task.dueDate);
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && diffDays >= 0 && task.status !== 'completed';
  };

  const isOverdue = () => {
    const dueDate = new Date(task.dueDate);
    const today = new Date();
    return dueDate < today && task.status !== 'completed';
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold text-gray-900">{task.title}</h3>
          <span 
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}
          >
            {task.status === 'assigned' ? 'Assigned' : 
             task.status === 'in-progress' ? 'In Progress' : 'Completed'}
          </span>
        </div>
        
        <p className="text-gray-600 mb-4">{task.description}</p>
        
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <Calendar className="h-4 w-4 mr-1" />
          <span className="mr-2">Created:</span>
          <span>{formatDate(task.createdAt)}</span>
        </div>
        
        <div className="flex items-center text-sm mb-4">
          <Clock className="h-4 w-4 mr-1" />
          <span className="mr-2">Due:</span>
          <span 
            className={`
              ${isOverdue() ? 'text-red-600 font-medium' : 
                isDueSoon() ? 'text-amber-600 font-medium' : 'text-gray-500'}
            `}
          >
            {formatDate(task.dueDate)}
            {isOverdue() && ' (Overdue)'}
            {isDueSoon() && !isOverdue() && ' (Due Soon)'}
          </span>
        </div>

        {task.status !== 'completed' && (
          <div className="flex justify-end space-x-3 mt-4">
            {task.status === 'assigned' && (
              <button
                onClick={() => onStatusChange(task.id, 'in-progress')}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Start Task
              </button>
            )}
            
            {task.status === 'in-progress' && (
              <button
                onClick={() => onStatusChange(task.id, 'completed')}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Mark as Completed
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;