

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/slices/authSlice';
import { toast } from 'react-toastify';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: 'intern@dacoid.com',
    password: 'Test123',
  });

  const [errors, setErrors] = useState({ email: '', password: '', global: '' });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '', global: '' }); // clear error as user types
  };

  const validate = () => {
    let valid = true;
    const newErrors = { email: '', password: '', global: '' };

    if (!email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        navigate('/dashboard');
      })
      .catch((err) => {
        const message = err.message || 'Invalid email or password';
        setErrors((prev) => ({ ...prev, global: message }));
        toast.error(message);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-100 via-pink-100 to-purple-200 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl border border-purple-300 w-full max-w-4xl flex flex-col md:flex-row overflow-hidden">

        {/* Left Side */}
        <div className="md:w-1/2 bg-purple-600 text-white flex flex-col justify-center items-center p-8">
          <img
            src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-135.jpg"
            alt="Login Visual"
            className="w-3/4 mb-4 rounded-lg shadow-md"
          />
          <h2 className="text-2xl font-bold text-center">Welcome Back!</h2>
          <p className="text-center text-sm mt-2 opacity-90">Enter your details to access your dashboard</p>
        </div>

        {/* Right Side - Form */}
        <div className="md:w-1/2 p-8 sm:p-10 flex flex-col justify-center bg-gray-50">
          <h1 className="text-3xl font-extrabold text-purple-700 mb-4 text-center">Sign In</h1>

          {/* Global error */}
          {errors.global && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md text-center mb-4 text-sm font-semibold shadow-sm">
              {errors.global}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                className={`w-full px-4 py-2 border ${
                  errors.email ? 'border-red-500' : 'border-purple-300'
                } rounded-lg focus:outline-none focus:ring-2 ${
                  errors.email ? 'focus:ring-red-400' : 'focus:ring-purple-500'
                } bg-white shadow-sm`}
              />
              {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                className={`w-full px-4 py-2 border ${
                  errors.password ? 'border-red-500' : 'border-purple-300'
                } rounded-lg focus:outline-none focus:ring-2 ${
                  errors.password ? 'focus:ring-red-400' : 'focus:ring-purple-500'
                } bg-white shadow-sm`}
              />
              {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition duration-300 font-semibold shadow-md disabled:opacity-50"
            >
              {status === 'loading' ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Don't have an account?{' '}
              <Link to="/register" className="text-purple-600 font-semibold hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

