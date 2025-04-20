import React, { useState } from 'react';

const PostEventPage: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    location: '',
    description: '',
    organizer: '',
    type: '',
  });

  // Mock current user role (replace with actual role-checking logic)
  const currentUserRole = 'admin'; // Change to 'alumni' or 'admin' for testing

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Event posted:', formData);
    // Add logic to save the event to the backend
    setFormData({
      title: '',
      date: '',
      location: '',
      description: '',
      organizer: '',
      type: '',
    });
  };

  if (currentUserRole !== 'admin' && currentUserRole !== 'alumni') {
    return <p className="text-center text-lg text-gray-600">You do not have permission to post events.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Post an Event</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Event Title</label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
          <input
            id="date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
          <input
            id="location"
            name="location"
            type="text"
            value={formData.location}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label htmlFor="organizer" className="block text-sm font-medium text-gray-700">Organizer</label>
          <input
            id="organizer"
            name="organizer"
            type="text"
            value={formData.organizer}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">Event Type</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Select Type</option>
            <option value="webinar">Webinar</option>
            <option value="workshop">Workshop</option>
            <option value="seminar">Seminar</option>
            <option value="networking">Networking</option>
          </select>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Post Event
        </button>
      </form>
    </div>
  );
};

export default PostEventPage;