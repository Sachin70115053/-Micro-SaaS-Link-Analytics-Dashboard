


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

// Define axios instance with authorization header
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Assuming your API URL is stored in VITE_API_URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add an interceptor to attach the token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const initialState = {
  links: [],
  totalLinks: 0,
  currentLink: null,
  analytics: null,
  status: {
    create: 'idle',
    fetch: 'idle',
    analytics: 'idle',
  },
  error: {
    create: null,
    fetch: null,
    analytics: null,
  },
  currentPage: 1,
  totalPages: 1,
};

// Create a new link
export const createLink = createAsyncThunk(
  'links/createLink',
  async (linkData, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/v1/links', linkData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message || 'Unknown error' });
    }
  }
);

// Get all links
export const getLinks = createAsyncThunk(
  'links/getLinks',
  async ({ page = 1, search = '' }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/v1/links?page=${page}&search=${search}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message || 'Unknown error' });
    }
  }
);

// Get link analytics by linkId
export const getLinkAnalytics = createAsyncThunk(
  'links/getLinkAnalytics',
  async (linkId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/v1/links/${linkId}/analytics`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message || 'Unknown error' });
    }
  }
);

const linksSlice = createSlice({
  name: 'links',
  initialState,
  reducers: {
    resetCurrentLink: (state) => {
      state.currentLink = null;
      state.analytics = null;
      state.status.analytics = 'idle';
      state.error.analytics = null;
    },
    resetStatusAndError: (state) => {
      state.status = { create: 'idle', fetch: 'idle', analytics: 'idle' };
      state.error = { create: null, fetch: null, analytics: null };
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Link
      .addCase(createLink.pending, (state) => {
        state.status.create = 'loading';
        state.error.create = null;
      })
      .addCase(createLink.fulfilled, (state, action) => {
        state.status.create = 'succeeded';
        state.links = [action.payload.data, ...state.links];
        toast.success('Link created successfully!');
      })
      .addCase(createLink.rejected, (state, action) => {
        state.status.create = 'failed';
        state.error.create = action.payload?.message || 'Failed to create link';
        toast.error(state.error.create);
      })
      
      // Get Links
      .addCase(getLinks.pending, (state) => {
        state.status.fetch = 'loading';
        state.error.fetch = null;
      })
      .addCase(getLinks.fulfilled, (state, action) => {
        state.status.fetch = 'succeeded';
        state.links = action.payload.data || [];
        state.totalLinks = action.payload.total || 0;
        state.currentPage = action.payload.page || 1;
        state.totalPages = action.payload.pages || 1;
      })
      .addCase(getLinks.rejected, (state, action) => {
        state.status.fetch = 'failed';
        state.error.fetch = action.payload?.message || 'Failed to get links';
        toast.error(state.error.fetch);
      })
      
      // Get Link Analytics
      .addCase(getLinkAnalytics.pending, (state) => {
        state.status.analytics = 'loading';
        state.error.analytics = null;
      })
      .addCase(getLinkAnalytics.fulfilled, (state, action) => {
        state.status.analytics = 'succeeded';
        state.currentLink = action.payload.data.link;
        state.analytics = action.payload.data;
      })
      .addCase(getLinkAnalytics.rejected, (state, action) => {
        state.status.analytics = 'failed';
        state.error.analytics = action.payload?.message || 'Failed to get analytics';
        toast.error(state.error.analytics);
      });
  },
});

export const { resetCurrentLink, resetStatusAndError } = linksSlice.actions;

export default linksSlice.reducer;
