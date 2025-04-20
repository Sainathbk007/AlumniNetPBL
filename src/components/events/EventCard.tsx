import React from 'react';
import { Link } from 'react-router-dom';
import { Event } from '../../types';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'webinar':
        return 'bg-blue-100 text-blue-800';
      case 'seminar':
        return 'bg-purple-100 text-purple-800';
      case 'workshop':
        return 'bg-green-100 text-green-800';
      case 'networking':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const isUpcoming = () => {
    const eventDate = new Date(`${event.date}T${event.time.split('-')[0]}`);
    return eventDate > new Date();
  };

  const registrationCount = event.registrations ? event.registrations.length : 0;

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transition duration-300 hover:shadow-lg">
      <div 
        className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center"
      >
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getEventTypeColor(event.type)}`}>
          {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
        </span>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
        
        <div className="space-y-2 mb-6">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-2" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Users className="h-4 w-4 mr-2" />
            <span>{registrationCount} {registrationCount === 1 ? 'person' : 'people'} registered</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-600">
            Organized by: {event.organizer}
          </span>
          
          <div className="flex space-x-3">
            <Link
              to={`/events/${event.id}`}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              Details
            </Link>
            {isUpcoming() && (
              <Link
                to={`/events/${event.id}/register`}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Register
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;