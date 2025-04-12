// // client/src/pages/Login.jsx
// import React from 'react';

// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { login } from '../store/slices/authSlice';
// import { toast } from 'react-toastify';

// const Login = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { status } = useSelector((state) => state.auth);
  
//   const [formData, setFormData] = useState({
//     email: 'intern@dacoid.com',
//     password: 'Test123'
//   });

//   const { email, password } = formData;

//   const onChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const onSubmit = (e) => {
//     e.preventDefault();
//     dispatch(login({ email, password }))
//       .unwrap()
//       .then(() => navigate('/dashboard'))
//       .catch(err => {
//         console.error('Login Failed:', err);
//         toast.error(err.message || 'Invalid email or password');
//       });
//   };

//   return (
//     <div className="max-w-md mx-auto mt-20">
//       <div className="bg-white rounded-xl shadow-md p-8">
//         <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">
//           Sign In
//         </h1>
//         <form onSubmit={onSubmit} className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={email}
//               onChange={onChange}
//               required
//               className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
//               value={password}
//               onChange={onChange}
//               required
//               className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
//             />
//           </div>
          
//           <button
//             type="submit"
//             disabled={status === 'loading'}
//             className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50"
//           >
//             {status === 'loading' ? 'Logging in...' : 'Login'}
//           </button>
//         </form>
        
//         <div className="mt-6 text-center">
//           <p className="text-gray-600">
//             Don't have an account?{' '}
//             <Link to="/register" className="text-purple-600 hover:underline">
//               Register
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// // export default Login;
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
    password: 'Test123'
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }))
      .unwrap()
      .then(() => navigate('/dashboard'))
      .catch(err => {
        console.error('Login Failed:', err);
        toast.error(err.message || 'Invalid email or password');
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
          <h1 className="text-3xl font-extrabold text-purple-700 mb-6 text-center">Sign In</h1>

          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                required
                className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                required
                className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white shadow-sm"
              />
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

// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { login } from '../store/slices/authSlice';
// import { toast } from 'react-toastify';


// const Login = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMessage('');

//     if (!email || !password) {
//       setErrorMessage('Please enter both email and password');
//       return;
//     }

//     try {
//       const response = await dispatch(login({ email, password })).unwrap();
//       if (response?.token) {
//         navigate('/dashboard');
//       }
//     } catch (err) {
//       // Error handling using toast notifications
//       setErrorMessage(
//         err?.message || err?.error || 'Login failed. Please try again.'
//       );
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

//         {errorMessage && (
//           <div className="mb-4 text-red-600 text-center font-medium">
//             {errorMessage}
//           </div>
//         )}

//         <form onSubmit={onSubmit}>
//           <div className="mb-4">
//             <label className="block mb-2 font-medium">Email</label>
//             <input
//               type="email"
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div className="mb-6">
//             <label className="block mb-2 font-medium">Password</label>
//             <input
//               type="password"
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
