import React from 'react';
import { useParams } from 'react-router-dom';
import { events } from '../data/mockData';

const EventDetailsPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const event = events.find((e) => e.id === eventId);

  if (!event) {
    return <p className="text-center text-lg text-gray-600">Event not found.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">{event.title}</h1>
      <p className="text-sm text-gray-600 mb-4">
        {new Date(event.date).toLocaleDateString()} • {event.time}
      </p>
      <p className="text-sm text-gray-600 mb-4">Location: {event.location}</p>
      <p className="text-sm text-gray-600 mb-4">Organizer: {event.organizer}</p>
      <p className="text-gray-700">{event.description}</p>
    </div>
  );
};

export default EventDetailsPage;