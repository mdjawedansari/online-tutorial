import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../features/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  // const handleLogin = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.get('http://localhost:5000/users');
  //     const users = response.data;
  //     const user = users.find(user => user.email === email && user.password === password);

  //     if (user) {
  //       dispatch(login(user));
  //       localStorage.setItem('authData', JSON.stringify(user));
  //       navigate('/');
  //     } else {
  //       alert('Invalid email or password');
  //     }
  //   } catch (error) {
  //     console.error('Error logging in:', error);
  //     alert('Login failed!');
  //   }
  // };
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      password: Yup.string()
        .required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.get('https://coding-pathshala.vercel.app/users');
        const users = response.data;
        const user = users.find(user => user.email === values.email && user.password === values.password);

        if (user) {
          dispatch(login(user));
          localStorage.setItem('authData', JSON.stringify(user));
          toast.success('Login Successful!')
          navigate('/');
        } else {
          toast.error('Invalid email or password');
        }
      } catch (error) {
        console.error('Error logging in:', error);
        toast.error('Login failed!');
      }
    },
  });

  return (
    <form className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md" onSubmit={formik.handleSubmit}>
      <h2 className="text-2xl font-bold mb-6">Login</h2>
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
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">Login</button>
      <Link to='/signup'>
        <div className='flex gap-1 justify-center'>
          <p className='text-gray-700 font-medium mt-2'>Don't have an account ?</p>
          <p className='text-sky-500 font-bold underline mt-2'>Signup</p>
        </div>
      </Link>
    </form>
  );
};

export default Login;
