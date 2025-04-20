import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { users } from '../data/mockData';
import AlumniCard from '../components/directory/AlumniCard';

const AlumniDirectoryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedField, setSelectedField] = useState('');

  // Get only alumni users
  const alumniUsers = users.filter(user => user.role === 'alumni');

  // Get unique fields for filter
  const fields = Array.from(
    new Set(
      alumniUsers
        .filter(alumni => alumni.field)
        .map(alumni => alumni.field)
    )
  );

  // Filter alumni based on search and field filter
  const filteredAlumni = alumniUsers.filter(alumni => {
    const matchesSearch = searchTerm === '' || 
      alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (alumni.company && alumni.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (alumni.position && alumni.position.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesField = selectedField === '' || alumni.field === selectedField;
    
    return matchesSearch && matchesField;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Alumni Directory
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500">
          Connect with our talented alumni from various fields
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
              placeholder="Search by name, company, or position..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="relative inline-flex">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              value={selectedField}
              onChange={(e) => setSelectedField(e.target.value)}
              className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">All Fields</option>
              {fields.map((field, index) => (
                <option key={index} value={field}>
                  {field}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {filteredAlumni.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAlumni.map((alumni) => (
            <AlumniCard key={alumni.id} alumni={alumni} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">No alumni found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default AlumniDirectoryPage;