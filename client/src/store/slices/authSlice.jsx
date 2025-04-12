// // client/src/store/slices/authSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const initialState = {
//   user: null,
//   token: localStorage.getItem('token') || null,
//   isAuthenticated: false,
//   status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
//   error: null,
// };

// // Unified API configuration
// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Add request interceptor for token injection
// api.interceptors.request.use(config => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export const login = createAsyncThunk(
//   'auth/login',
//   async ({ email, password }, { rejectWithValue }) => {
//     try {
//       const response = await api.post('/api/v1/auth/login', { email, password });
//       return response.data;
//     } catch (err) {
//       const error = err.response?.data || { message: 'Login failed' };
//       toast.error(error.message);
//       return rejectWithValue(error);
//     }
//   }
// );

// export const register = createAsyncThunk(
//   'auth/register',
//   async ({ name, email, password }, { rejectWithValue }) => {
//     try {
//       const response = await api.post('/api/v1/auth/register', { name, email, password });
//       toast.success('Registration successful!');
//       return response.data;
//     } catch (err) {
//       const error = err.response?.data || { message: 'Registration failed' };
//       toast.error(error.message);
//       return rejectWithValue(error);
//     }
//   }
// );

// // client/src/store/slices/authSlice.js
// export const getMe = createAsyncThunk(
//   'auth/getMe',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await api.get('/api/v1/auth/me', {
//         headers: {
//           'Cache-Control': 'no-cache',
//           Pragma: 'no-cache'
//         }
//       });
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data);
//     }
//   }
// );

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     logout: (state) => {
//       localStorage.removeItem('token');
//       state.user = null;
//       state.token = null;
//       state.isAuthenticated = false;
//       state.status = 'idle';
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Login cases
//       .addCase(login.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(login.fulfilled, (state, { payload }) => {
//         state.status = 'succeeded';
//         state.token = payload.token;
//         state.isAuthenticated = true;
//         localStorage.setItem('token', payload.token);
//       })
//       .addCase(login.rejected, (state) => {
//         state.status = 'failed';
//         state.isAuthenticated = false;
//       })

//       // Registration cases
//       .addCase(register.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(register.fulfilled, (state, { payload }) => {
//         state.status = 'succeeded';
//         state.token = payload.token;
//         state.isAuthenticated = true;
//         localStorage.setItem('token', payload.token);
//       })
//       .addCase(register.rejected, (state) => {
//         state.status = 'failed';
//         state.isAuthenticated = false;
//       })

//       // Get current user cases
//       .addCase(getMe.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(getMe.fulfilled, (state, { payload }) => {
//         state.status = 'succeeded';
//         state.user = payload.data;
//         state.isAuthenticated = true;
//       })
//       .addCase(getMe.rejected, (state) => {
//         state.status = 'failed';
//         state.isAuthenticated = false;
//         localStorage.removeItem('token');
//         state.token = null;
//         state.user = null;
//       });
//   }
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;




import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: false,
  status: 'idle',
  error: null,
};

// Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Inject token into headers
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/v1/auth/login', { email, password });
      return response.data;
    } catch (err) {
      const error = err.response?.data || { message: 'Login failed' };
      toast.error(error.message);
      return rejectWithValue(error);
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/v1/auth/register', { name, email, password });
      toast.success('Registration successful!');
      return response.data;
    } catch (err) {
      const error = err.response?.data || { message: 'Registration failed' };
      toast.error(error.message);
      return rejectWithValue(error);
    }
  }
);

export const getMe = createAsyncThunk(
  'auth/getMe',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/v1/auth/me');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.token = payload.token;
        state.isAuthenticated = true;
        localStorage.setItem('token', payload.token);
      })
      .addCase(login.rejected, (state) => {
        state.status = 'failed';
        state.isAuthenticated = false;
      })

      .addCase(register.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.token = payload.token;
        state.isAuthenticated = true;
        localStorage.setItem('token', payload.token);
      })
      .addCase(register.rejected, (state) => {
        state.status = 'failed';
        state.isAuthenticated = false;
      })

      .addCase(getMe.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getMe.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.user = payload.data;
        state.isAuthenticated = true;
      })
      .addCase(getMe.rejected, (state) => {
        state.status = 'failed';
        state.isAuthenticated = false;
        localStorage.removeItem('token');
        state.token = null;
        state.user = null;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;




// import { createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

// const initialState = {
//   user: null,
//   isAuthenticated: false,
//   loading: true,
//   error: null,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     loginSuccess: (state, action) => {
//       state.user = action.payload.user;
//       state.isAuthenticated = true;
//       state.loading = false;
//       state.error = null;
//     },
//     logoutSuccess: (state) => {
//       state.user = null;
//       state.isAuthenticated = false;
//       state.loading = false;
//       state.error = null;
//     },
//     authError: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     userLoaded: (state, action) => {
//       state.user = action.payload;
//       state.isAuthenticated = true;
//       state.loading = false;
//       state.error = null;
//     },
//   },
// });

// export const { loginSuccess, logoutSuccess, authError, userLoaded } = authSlice.actions;

// // Async action to load user from token
// export const loadUser = () => async (dispatch) => {
//   try {
//     const token = localStorage.getItem('token');
    
//     if (!token) {
//       dispatch(logoutSuccess());
//       return;
//     }

//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };

//     const res = await axios.get('/api/auth/me', config);
//     dispatch(userLoaded(res.data));
//   } catch (error) {
//     localStorage.removeItem('token');
//     dispatch(logoutSuccess());
//   }
// };

// // Login action
// export const login = (credentials) => async (dispatch) => {
//   try {
//     const res = await axios.post('/api/auth/login', credentials);
//     localStorage.setItem('token', res.data.token);
//     dispatch(loginSuccess(res.data));
//   } catch (error) {
//     localStorage.removeItem('token');
//     dispatch(authError(error.response?.data?.message || 'Login failed'));
//   }
// };

// // Logout action
// export const logout = () => (dispatch) => {
//   localStorage.removeItem('token');
//   dispatch(logoutSuccess());
// };

// export default authSlice.reducer;