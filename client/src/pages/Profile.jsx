import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../features/authSlice.js'; // Adjust path
import toast from 'react-hot-toast';

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user); // Fetch user from Redux
  const userId = user?.id; // Ensure user ID is available

  const formik = useFormik({
    initialValues: {
      username: user?.username || '',
      email: user?.email || '',
      password: '', // Optional
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .matches(/^(?=.*[a-z])(?=.*[A-Z]).{3,}$/, 'Must contain both uppercase and lowercase letters and be at least 3 characters long')
        .required('Required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      password: Yup.string()
        .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/, 'Must contain at least one uppercase letter, one special character, one digit, and be at least 6 characters long')
        .optional(),
    }),
    onSubmit: async (values) => {
      try {
        const updatedUser = { ...values };
        if (values.password === '') {
          delete updatedUser.password; // Remove if not updated
        }
        
        // Update profile
        const response = await axios.put(`http://localhost:3000/users/${userId}`, updatedUser);

        // Update in Redux store
        dispatch(updateProfile(response.data));
        toast.success('Profile updated successfully!');
      } catch (error) {
        console.error('Error updating profile:', error);
        toast.error('Profile update failed!');
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6">Update Profile</h2>
      <div className="mb-4">
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
        <input
          type="text"
          id="username"
          {...formik.getFieldProps('username')}
          className="mt-1 p-2 border w-full"
        />
        {formik.touched.username && formik.errors.username ? (
          <div className="text-red-500 text-sm">{formik.errors.username}</div>
        ) : null}
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          {...formik.getFieldProps('email')}
          className="mt-1 p-2 border w-full"
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-500 text-sm">{formik.errors.email}</div>
        ) : null}
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password (optional)</label>
        <input
          type="password"
          id="password"
          {...formik.getFieldProps('password')}
          className="mt-1 p-2 border w-full"
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-500 text-sm">{formik.errors.password}</div>
        ) : null}
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">Update Profile</button>
    </form>
  );
};

export default Profile;
