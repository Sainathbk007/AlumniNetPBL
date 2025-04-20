import React from 'react';
import { Users, Briefcase, Calendar, BookOpen } from 'lucide-react';

const Statistics: React.FC = () => {
  const stats = [
    {
      id: 1,
      name: 'Alumni Members',
      value: '10,000+',
      icon: <Users className="h-10 w-10 text-blue-500" />,
      description: 'Active alumni across the globe',
    },
    {
      id: 2,
      name: 'Jobs Posted',
      value: '2,500+',
      icon: <Briefcase className="h-10 w-10 text-teal-500" />,
      description: 'Opportunities shared by alumni',
    },
    {
      id: 3,
      name: 'Annual Events',
      value: '120+',
      icon: <Calendar className="h-10 w-10 text-amber-500" />,
      description: 'Webinars, seminars and workshops',
    },
    {
      id: 4,
      name: 'Mentorships',
      value: '5,000+',
      icon: <BookOpen className="h-10 w-10 text-indigo-500" />,
      description: 'Students mentored by alumni',
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Our Impact by the Numbers
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            See how our alumni network is making a difference
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-white rounded-lg shadow-md p-6 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border-t-4"
              style={{ borderTopColor: stat.id === 1 ? '#3B82F6' : stat.id === 2 ? '#0D9488' : stat.id === 3 ? '#F59E0B' : '#6366F1' }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">{stat.icon}</div>
                <h3 className="text-lg font-medium text-gray-900">{stat.name}</h3>
                <p className="mt-2 text-3xl font-extrabold text-gray-900">{stat.value}</p>
                <p className="mt-1 text-sm text-gray-500">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;