import React, { useState } from 'react';

const ManageEventsPage: React.FC = () => {
  const [events, setEvents] = useState([
    { id: 1, title: 'Alumni Meetup', date: '2025-05-15', location: 'Main Hall' },
    { id: 2, title: 'Career Fair', date: '2025-06-10', location: 'Auditorium' },
  ]);

  const handleDelete = (eventId: number) => {
    setEvents(events.filter((event) => event.id !== eventId));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Manage Events</h1>
      <table className="min-w-full bg-white border border-gray-200 rounded-md">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Title</th>
            <th className="px-4 py-2 border-b">Date</th>
            <th className="px-4 py-2 border-b">Location</th>
            <th className="px-4 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td className="px-4 py-2 border-b">{event.title}</td>
              <td className="px-4 py-2 border-b">{event.date}</td>
              <td className="px-4 py-2 border-b">{event.location}</td>
              <td className="px-4 py-2 border-b">
                <button
                  onClick={() => handleDelete(event.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageEventsPage;