// import React, { useState } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';

// const EditProfilePage: React.FC = () => {
//   const { currentUser, updateUser } = useAuth();
//   const navigate = useNavigate();

//   if (!currentUser) {
//     navigate('/login'); // Redirect to login if user is not logged in
//     return null;
//   }

//   const [formData, setFormData] = useState({
//     name: currentUser.name || '',
//     email: currentUser.email || '',
//     graduationYear: currentUser.graduationYear || '',
//     company: currentUser.company || '',
//     position: currentUser.position || '',
//     field: currentUser.field || '',
//     skills: currentUser.skills?.join(', ') || '',
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     const updatedUser = {
//       ...currentUser,
//       ...formData,
//       skills: formData.skills.split(',').map((skill) => skill.trim()),
//     };

//     updateUser(updatedUser); // Update user in AuthContext
//     navigate('/profile'); // Redirect to profile page
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//               Name
//             </label>
//             <input
//               id="name"
//               name="name"
//               type="text"
//               value={formData.name}
//               onChange={handleChange}
//               required
//               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             />
//           </div>
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <input
//               id="email"
//               name="email"
//               type="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             />
//           </div>
//           <div>
//             <label htmlFor="graduationYear" className="block text-sm font-medium text-gray-700">
//               Graduation Year
//             </label>
//             <input
//               id="graduationYear"
//               name="graduationYear"
//               type="number"
//               value={formData.graduationYear}
//               onChange={handleChange}
//               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             />
//           </div>
//           <div>
//             <label htmlFor="company" className="block text-sm font-medium text-gray-700">
//               Company
//             </label>
//             <input
//               id="company"
//               name="company"
//               type="text"
//               value={formData.company}
//               onChange={handleChange}
//               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             />
//           </div>
//           <div>
//             <label htmlFor="position" className="block text-sm font-medium text-gray-700">
//               Position
//             </label>
//             <input
//               id="position"
//               name="position"
//               type="text"
//               value={formData.position}
//               onChange={handleChange}
//               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             />
//           </div>
//           <div>
//             <label htmlFor="field" className="block text-sm font-medium text-gray-700">
//               Field
//             </label>
//             <input
//               id="field"
//               name="field"
//               type="text"
//               value={formData.field}
//               onChange={handleChange}
//               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             />
//           </div>
//           <div>
//             <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
//               Skills (comma-separated)
//             </label>
//             <textarea
//               id="skills"
//               name="skills"
//               value={formData.skills}
//               onChange={handleChange}
//               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             />
//           </div>
//           <button
//             type="submit"
//             className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//           >
//             Save Changes
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditProfilePage;