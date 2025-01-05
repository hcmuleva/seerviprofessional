import { useState } from 'react';

const MatrimonialCardGrid = () => {
  // Sample profiles data - in real app this would come from props
  const profiles = [
    {
      id: "1",
      name: "Rahul Seervi",
      fatherName: "Ramesh Seervi",
      motherName: "Sunita Seervi",
      dob: "15 Aug 1995",
      age: 28,
      gotra: "Kashyap",
      occupation: "Software Engineer",
      location: "Bilara, Rajasthan",
      education: "B.Tech in Computer Science",
      height: "5'10\"",
      contact: {
        phone: "+91 98765 43210",
        email: "rahul.seervi@example.com"
      }
    },
    {
      id: "2",
      name: "Priya Seervi",
      fatherName: "Suresh Seervi",
      motherName: "Meena Seervi",
      dob: "22 Sep 1996",
      age: 27,
      gotra: "Bharadwaj",
      occupation: "Data Scientist",
      location: "Jodhpur, Rajasthan",
      education: "M.Tech in Data Science",
      height: "5'6\"",
      contact: {
        phone: "+91 98765 43211",
        email: "priya.seervi@example.com"
      }
    },
    {
      id: "3",
      name: "Amit Seervi",
      fatherName: "Rajesh Seervi",
      motherName: "Pushpa Seervi",
      dob: "10 Mar 1994",
      age: 29,
      gotra: "Kashyap",
      occupation: "Doctor",
      location: "Jaipur, Rajasthan",
      education: "MBBS, MD",
      height: "5'11\"",
      contact: {
        phone: "+91 98765 43212",
        email: "amit.seervi@example.com"
      }
    },
    {
      id: "4",
      name: "Neha Seervi",
      fatherName: "Dinesh Seervi",
      motherName: "Rekha Seervi",
      dob: "05 Dec 1995",
      age: 28,
      gotra: "Gautam",
      occupation: "Chartered Accountant",
      location: "Udaipur, Rajasthan",
      education: "CA",
      height: "5'5\"",
      contact: {
        phone: "+91 98765 43213",
        email: "neha.seervi@example.com"
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Matrimonial Profiles</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {profiles.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      </div>
    </div>
  );
};

const ProfileCard = ({ profile }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div
      className={`transform transition-all duration-500 ${
        isHovered ? 'scale-[1.02]' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white rounded-2xl overflow-hidden shadow-[0_10px_20px_rgba(0,0,0,0.2)] transform-gpu">
        {/* Decorative Top Bar */}
        <div className="h-2 bg-gradient-to-r from-rose-400 via-rose-500 to-rose-600"></div>

        {/* Profile Header */}
        <div className="relative bg-gradient-to-r from-rose-400 to-rose-300 p-6">
          <div className="absolute inset-0 bg-black opacity-5"></div>
          <div className="relative flex items-start space-x-4">
            {/* Profile Image */}
            <div className="w-24 h-24 rounded-xl overflow-hidden border-4 border-white shadow-lg transform hover:scale-105 transition-transform duration-300">
              <img 
                src="/api/placeholder/96/96"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Basic Info */}
            <div className="flex-1 text-white">
              <h3 className="text-xl font-bold mb-1">{profile.name}</h3>
              <p className="text-sm opacity-90">Age: {profile.age}</p>
              <p className="text-sm opacity-90">DOB: {profile.dob}</p>
              <p className="text-sm opacity-90">Gotra: {profile.gotra}</p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-4">
          {/* Primary Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-gray-600 text-sm">Father's Name</p>
              <p className="font-medium">{profile.fatherName}</p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-600 text-sm">Mother's Name</p>
              <p className="font-medium">{profile.motherName}</p>
            </div>
          </div>

          {/* Expandable Details */}
          <div className={`space-y-4 transition-all duration-300 ${
            showDetails ? 'opacity-100 max-h-[500px]' : 'opacity-0 max-h-0 overflow-hidden'
          }`}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-gray-600 text-sm">Education</p>
                <p className="font-medium">{profile.education}</p>
              </div>
              <div className="space-y-1">
                <p className="text-gray-600 text-sm">Occupation</p>
                <p className="font-medium">{profile.occupation}</p>
              </div>
              <div className="space-y-1">
                <p className="text-gray-600 text-sm">Location</p>
                <p className="font-medium">{profile.location}</p>
              </div>
              <div className="space-y-1">
                <p className="text-gray-600 text-sm">Height</p>
                <p className="font-medium">{profile.height}</p>
              </div>
            </div>

            {/* Contact Section */}
            <div className="bg-rose-50 p-4 rounded-xl">
              <h4 className="font-semibold mb-2">Contact Details</h4>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="text-gray-600">Phone: </span>
                  {profile.contact.phone}
                </p>
                <p className="text-sm">
                  <span className="text-gray-600">Email: </span>
                  {profile.contact.email}
                </p>
              </div>
            </div>
          </div>

          {/* Toggle Button */}
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="w-full bg-gradient-to-r from-rose-400 to-rose-300 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
          >
            {showDetails ? 'Show Less' : 'Show More Details'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatrimonialCardGrid;