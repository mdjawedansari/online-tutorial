import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { updateProfile } from '../features/authSlice';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const updatedUser = { ...user, username, email };

    try {
      const response = await axios.get('https://coding-pathshala.vercel.app/users');
      const users = response.data;
      const userId = users.find(u => u.email === user.email).id;

      await axios.put(`https://coding-pathshala.vercel.app/users/${userId}`, updatedUser);

      localStorage.setItem('authData', JSON.stringify(updatedUser));
      dispatch(updateProfile(updatedUser));
      toast.success('Profile updated successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Profile update failed!');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
      <form onSubmit={handleUpdateProfile}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            id="username"
            className="mt-1 p-2 border w-full"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            className="mt-1 p-2 border w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
