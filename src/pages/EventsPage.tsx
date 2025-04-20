import React, { useState } from 'react';
import { Calendar, Filter, Search } from 'lucide-react';
import { events } from '../data/mockData';
import EventCard from '../components/events/EventCard';

const EventsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [showUpcomingOnly, setShowUpcomingOnly] = useState(true);

  // Filter events based on search, type, and upcoming status
  const filteredEvents = events.filter(event => {
    const matchesSearch = searchTerm === '' || 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === '' || event.type === selectedType;
    
    const matchesUpcoming = !showUpcomingOnly || 
      new Date(`${event.date}T${event.time.split('-')[0]}`) > new Date();
    
    return matchesSearch && matchesType && matchesUpcoming;
  });

  // Sort events by date (upcoming first)
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time.split('-')[0]}`);
    const dateB = new Date(`${b.date}T${b.time.split('-')[0]}`);
    return dateA.getTime() - dateB.getTime();
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Events & Webinars
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500">
          Stay connected with our community through various events
        </p>
      </div>

      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search events..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="relative inline-flex">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">All Types</option>
              <option value="webinar">Webinar</option>
              <option value="seminar">Seminar</option>
              <option value="workshop">Workshop</option>
              <option value="networking">Networking</option>
            </select>
          </div>

          <div className="inline-flex items-center">
            <input
              id="upcoming-only"
              type="checkbox"
              checked={showUpcomingOnly}
              onChange={(e) => setShowUpcomingOnly(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="upcoming-only" className="ml-2 block text-sm text-gray-900">
              <Calendar className="h-4 w-4 inline mr-1" />
              Upcoming events only
            </label>
          </div>
        </div>
      </div>

      {sortedEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">No events found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default EventsPage;