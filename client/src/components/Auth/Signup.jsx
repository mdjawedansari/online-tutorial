import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Signup = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
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
        .required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        const userData = { ...values, role: 'user' };
        const response = await axios.post('http://localhost:3000/users', userData);
        
        console.log('Registration response:', response.data); // Log response

        localStorage.setItem('authData', JSON.stringify(response.data));
        toast.success('Registration successful!');
        navigate('/login');
      } catch (error) {
        console.error('Error registering user:', error.response ? error.response.data : error.message);
        toast.error('Registration failed!');
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6">Signup</h2>
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
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
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
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">Signup</button>
      <div className="flex gap-1 justify-center mt-2">
        <p className="text-gray-700 font-medium">Already have an account?</p>
        <p className="text-sky-500 font-bold underline"><Link to="/login">Login</Link></p>
      </div>
    </form>
  );
};

export default Signup;
