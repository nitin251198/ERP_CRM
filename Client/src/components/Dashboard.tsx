// src/components/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import Navbar from './NavBar';
import toast from 'react-hot-toast';

// GraphQL Queries
const GET_USER_PROFILE = gql`
  query GetUserProfile {
    userQuery {
      username
      email
      id
    }
  }
`;

const UPDATE_USERNAME = gql`
 mutation UpdateUser($input: UpdateUsernameInput!) {
  updateUser(input: $input) {
    username
  }
}
`;

const Dashboard: React.FC = () => {
  // Fetch user profile data
  const { data } = useQuery(GET_USER_PROFILE, {
    context: {
      headers: {
        Authorization: localStorage.getItem('authToken'),  // Pass the token here
        },
},
  }
  );
  const [UpdateUser] = useMutation(UPDATE_USERNAME,{
    context: {
      headers: {
        Authorization: localStorage.getItem('authToken'),  // Pass the token here
        },
},
  });

  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [newUsername, setNewUsername] = useState<string>('');

  useEffect(() => {
    if (data) {
      setUsername(data.userQuery.username);
      setEmail(data.userQuery.email);
    }
  }, [data]);

  const handleUsernameChange = async () => {
    try {
      const result = await UpdateUser({ variables: { input:{
        username: newUsername
      } } });
      toast.success('Username updated successfully!');
      // Update the UI with the new username
      if (result.data && result.data.updateUser) {
        setUsername(result.data.updateUser.username);
        setNewUsername(''); // Clear the input field after updating
      }
    } catch (err) {
      console.error('Error updating username:', err);
      toast.error('Failed to update username');
    }
  };

  return (
    <div className="p-4 bg-gray-100 shadow-md min-h-screen">
      <Navbar />
      <h2 className="text-xl font-bold mb-4 mt-20 text-black text-center">Dashboard</h2>
      <p className="text-black text-center">Welcome to the dashboard!</p>

      <div className="profile mt-10 bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
        {/* Display current username */}
        <label className="block text-black text-center mb-2">Current Username:</label>
        <input
          type="text"
          value={username}
          disabled
          className="block w-3/4 mx-auto border-2 border-gray-300 p-2 rounded-md bg-gray-200"
        />

        {/* Allow user to update username */}
        <label className="block text-black text-center mb-2 mt-4">New Username:</label>
        <input
          type="text"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          className="block w-3/4 mx-auto border-2 border-gray-300 p-2 rounded-md"
        />
        <button
          onClick={handleUsernameChange}
          className="block bg-blue-700 text-white px-4 py-2 mt-4 mx-auto rounded-lg w-3/4"
        >
          Update Username
        </button>

        {/* Display email */}
        <label className="block text-black text-center mt-4 mb-2">Email:</label>
        <input
          type="email"
          value={email}
          disabled
          className="block w-3/4 mx-auto border-2 border-gray-300 p-2 rounded-md bg-gray-200"
        />
      </div>
    </div>
  );
};

export default Dashboard;
