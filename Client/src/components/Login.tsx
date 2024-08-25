import React, { useState } from 'react';
import { login } from '../service';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import './styles/Login.css'; // Import the styling

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [formErrors, setFormErrors] = useState({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let valid = true;
    const newFormErrors = { email: '', password: '' };

    if (!formData.email.trim()) {
      newFormErrors.email = 'Email is required';
      valid = false;
    }

    if (!formData.password.trim()) {
      newFormErrors.password = 'Password is required';
      valid = false;
    }

    setFormErrors(newFormErrors);

    if (valid) {
      try {
        let response = await login(formData);

        if (response.success) {
          localStorage.setItem('authToken',"Bearer "+response.token);
          toast.success("Login Successfully!");
          navigate('/dashboard');
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error('Unable to login');
      }
    }
  };

  return (
    <div className='bg-blue-100 min-h-screen flex items-center justify-center'>
      <div className="form-container bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-center mb-4 text-2xl font-semibold">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="label-wrapper mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input-field border border-gray-300 p-2 rounded-md w-full"
            />
            {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
          </div>
          <div className="label-wrapper mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input-field border border-gray-300 p-2 rounded-md w-full"
            />
            {formErrors.password && <p className="text-red-500 text-sm">{formErrors.password}</p>}
          </div>
          <div className="button-container mb-4">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full">
              Login
            </button>
          </div>
        </form>
        <div className="link-container text-center">
          <Link to="/signup" className="text-blue-500 hover:text-blue-700">
            Don't have an account? Signup here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
