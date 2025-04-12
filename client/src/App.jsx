// // client/src/App.js
// import { useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { getMe } from './store/slices/authSlice';
// import PrivateRoute from './components/routing/PrivateRoute';
// import Navbar from './components/layout/Navbar';
// import Alert from './components/layout/Alert';
// import Login from './pages/Login';
// import Dashboard from './pages/Dashboard';
// import CreateLink from './pages/CreateLink';
// import Analytics from './pages/Analytics';
// import Home from './pages/Home';
// import React from 'react';
// import Register from './pages/Register'


// function App() {
//   const dispatch = useDispatch();
//   const { token } = useSelector((state) => state.auth);

//   // Load user on app mount if token exists
//   useEffect(() => {
//     if (token) {
//       dispatch(getMe());
//     }
//   }, [token, dispatch]);

//   return (
//     <Router>
//       <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
//         <Navbar />
//         <Alert />
//         <div className="container mx-auto px-4 py-8">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/login" element={<Login />} />
//             <Route
//               path="/dashboard"
//               element={<PrivateRoute component={Dashboard} />}
//             />
// <Route element={<PrivateRoute />}>
//     <Route path="/" element={<Dashboard />} />
//     <Route path="/dashboard" element={<Dashboard />} />
//     <Route path="/create-link" element={<CreateLink />} />
//     <Route path="/analytics/:id" element={<Analytics />} />
//   </Route>

//            <Route path="/register" element={<Register />}/>

            
//             <Route
//               path="/analytics/:id"
//               element={<PrivateRoute component={Analytics} />}
//             />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;




// client/src/App.js
import React from 'react';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getMe } from './store/slices/authSlice';
import PrivateRoute from './components/routing/PrivateRoute';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreateLink from './pages/CreateLink';
import Analytics from './pages/Analytics';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';

import Register from './pages/Register';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
  },[dispatch]);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        <Navbar />
        <Alert />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/register" element={<Register />} />

            {/*  All protected routes nested under PrivateRoute */}
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/create-link" element={<CreateLink />} />
              <Route path="/analytics/:id" element={<Analytics />} />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
