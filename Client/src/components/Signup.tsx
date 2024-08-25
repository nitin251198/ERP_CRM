import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import { signup } from '../service';
import './styles/Signup.css'; // Import the styling

const SignupPage: React.FC = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await signup(values);

        if (response.success) {
          toast.success('Account created successfully. Please login.');
          navigate('/');
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error('Unable to create an account');
      }
    },
  });

  return (
    <div className='bg-blue-100 min-h-screen flex items-center justify-center'>
      <div className="form-container bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-center mb-4 text-2xl font-semibold">Signup</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="label-wrapper mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username:</label>
            <input
              type="text"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="input-field border border-gray-300 p-2 rounded-md w-full"
            />
            {formik.touched.username && formik.errors.username && (
              <p className="text-red-500 text-sm">{formik.errors.username}</p>
            )}
          </div>
          <div className="label-wrapper mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="input-field border border-gray-300 p-2 rounded-md w-full"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm">{formik.errors.email}</p>
            )}
          </div>
          <div className="label-wrapper mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="input-field border border-gray-300 p-2 rounded-md w-full"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm">{formik.errors.password}</p>
            )}
          </div>
          <div className="button-container mb-4">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full">
              Signup
            </button>
          </div>
        </form>
        <div className="link-container text-center">
          <Link to="/login" className="text-blue-500 hover:text-blue-700">
            Already have an account? Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
