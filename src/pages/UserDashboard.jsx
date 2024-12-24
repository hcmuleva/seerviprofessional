import React, { useState } from 'react';
import { useList } from "@refinedev/core";
import { Heart, Mail, Star, Ban, XCircle } from 'lucide-react';

const UserDashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchId, setSearchId] = useState('');
  const [searchVyapar, setSearchVyapar] = useState('');
  const itemsPerPage = 10;

  const { data: usersData, isLoading, isFetching } = useList({
    resource: "users",
    meta: {
      populate: ["profilePicture", "vyaapars"],
    },
  });

  if (isLoading || isFetching) {
    return <h1 style={{ textAlign: 'center' }}>Loading...</h1>;
  }

  // Filter users based on search criteria
  const filteredUsers = usersData?.data?.filter(user => {
    const matchesId = user.id.toString().toLowerCase().includes(searchId.toLowerCase());
    const matchesVyapar = user?.vyaapars[0]?.type?.toLowerCase().includes(searchVyapar.toLowerCase());
    return matchesId && matchesVyapar;
  }) || [];

  // Calculate pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div style={{
      maxWidth: '64rem',
      margin: '0 auto',
      padding: '1rem',
    }}>
      {/* Search Filters */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '1rem',
      }}>
        <input
          type="text"
          placeholder="Search by ID..."
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          style={{
            padding: '0.5rem',
            border: '1px solid #ccc',
            borderRadius: '0.25rem',
            width: '200px',
          }}
        />
        <input
          type="text"
          placeholder="Search by Vyapar Type..."
          value={searchVyapar}
          onChange={(e) => setSearchVyapar(e.target.value)}
          style={{
            padding: '0.5rem',
            border: '1px solid #ccc',
            borderRadius: '0.25rem',
            width: '200px',
          }}
        />
      </div>

      {/* User Cards */}
      {paginatedUsers.map((user) => (
        <div key={user.id} style={{
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
          padding: '1rem',
          marginBottom: '1rem'
        }}>
          {/* ... Rest of the card content remains the same ... */}
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ flexShrink: 0 }}>
              <img
                src={user.profilePicture?.url || "/Person.png"}
                alt={user.firstname}
                style={{
                  width: '8rem',
                  height: '8rem',
                  borderRadius: '0.5rem',
                  objectFit: 'cover'
                }}
              />
              <p style={{
                fontSize: '0.875rem',
                marginTop: '0.5rem',
                color: '#666'
              }}>
                ID: {user.id}
              </p>
            </div>

            <div style={{ flexGrow: 1 }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start'
              }}>
                <div>
                  <h2 style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    margin: '0'
                  }}>{user.firstname}</h2>
                  <p style={{
                    fontSize: '0.875rem',
                    color: '#666'
                  }}>Father: {user.father}</p>
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1rem',
                marginTop: '1rem'
              }}>
                <div>
                  <p><span style={{ fontWeight: '500' }}>Vyaapar Type:</span> {user?.vyaapars[0]?.type || 'N/A'}</p>
                  <p><span style={{ fontWeight: '500' }}>Date of Birth:</span> {user?.dob || 'N/A'}</p>
                  <p><span style={{ fontWeight: '500' }}>Gotra:</span> {user?.gotra || 'N/A'}</p>
                </div>
                <div>
                  <p><span style={{ fontWeight: '500' }}>Locality:</span> {user?.state || 'N/A'}</p>
                  <p><span style={{ fontWeight: '500' }}>Working City:</span> {user?.city || 'N/A'}</p>
                  
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            marginTop: '1rem'
          }}>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              backgroundColor: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: 'pointer'
            }}>

              <Mail size={16} /> Contact
            </button>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              backgroundColor: '#eab308',
              color: 'white',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: 'pointer'
            }}>
              <Star size={16} /> Shortlist
            </button>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              backgroundColor: '#22c55e',
              color: 'white',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: 'pointer'
            }}>
              <Ban size={16} /> More Details
            </button>
          </div>
        </div>
      ))}

      {/* Pagination Controls */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '0.5rem',
        marginTop: '1rem'
      }}>
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: currentPage === 1 ? '#ccc' : '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '0.25rem',
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
          }}
        >
          Previous
        </button>
        <span style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0 1rem'
        }}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: currentPage === totalPages ? '#ccc' : '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '0.25rem',
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;