
// import React from 'react';
// // client/src/components/routing/PrivateRoute.jsx
// import { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Navigate, Outlet } from 'react-router-dom';
// import { getMe } from '../../store/slices/authSlice';

// const PrivateRoute = () => {
//   const dispatch = useDispatch();
//   const { isAuthenticated, status } = useSelector((state) => state.auth);

//   useEffect(() => {
//     if (localStorage.getItem('token')) {
//       dispatch(getMe());
//     }
//   }, [dispatch]);

//   if (status === 'loading') {
//     return <div className="text-center p-8">Verifying session...</div>;
//   }

//   return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
// };



// export default PrivateRoute;



// components/routing/PrivateRoute.jsx
import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { getMe } from '../../store/slices/authSlice';

const PrivateRoute = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, status } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated && localStorage.getItem('token')) {
      dispatch(getMe());
    }
  }, [dispatch, isAuthenticated]);

  if (status === 'loading') {
    return <div className="text-center p-8">Checking session...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
