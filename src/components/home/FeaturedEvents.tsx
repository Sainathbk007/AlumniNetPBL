import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { events } from '../../data/mockData';

const FeaturedEvents: React.FC = () => {
  // Get upcoming events
  const upcomingEvents = events.slice(0, 2);

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Upcoming Events
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Connect with alumni and expand your network at our upcoming events
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="group relative bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="h-48 bg-blue-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-700/20 to-indigo-900/30"></div>
                <div className="absolute top-4 left-4 bg-blue-600 text-white py-1 px-3 rounded-full text-sm font-medium">
                  {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {event.title}
                </h3>
                <p className="text-gray-600 mb-6 line-clamp-2">
                  {event.description}
                </p>
                
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
                </div>
                
                <div className="flex justify-between items-center">
                  <Link
                    to={`/events/${event.id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    View Details
                  </Link>
                  <Link
                    to={`/events/${event.id}/register`}
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Register
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/events"
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 shadow"
          >
            View All Events
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;