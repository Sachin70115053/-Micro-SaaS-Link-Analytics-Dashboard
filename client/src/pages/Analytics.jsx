

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getLinkAnalytics } from '../store/slices/linksSlice';
import Spinner from '../components/layout/Spinner';
import { 
  ResponsiveContainer, 
  LineChart, Line, 
  XAxis, YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar 
} from 'recharts';

const Analytics = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { currentLink, analytics, status } = useSelector((state) => state.links);
  
  useEffect(() => {
    dispatch(getLinkAnalytics(id));
  }, [dispatch, id]);
  
  if (status === 'loading' || !analytics) {
    return <Spinner />;
  }
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  // Fallbacks: if any analytics fields are undefined, use empty arrays
  const clicksByDay = analytics.clicksByDay || [];
  const clicksByDevice = analytics.clicksByDevice || [];
  const clicksByBrowser = analytics.clicksByBrowser || [];
  const clicksByCountry = analytics.clicksByCountry || [];

  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-xl md:text-2xl font-bold text-purple-700">Link Analytics</h1>
        <Link
          to="/dashboard"
          className="w-full md:w-auto px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors text-center"
        >
          Back to Dashboard
        </Link>
      </div>
      
      {/* Link Info Card */}
      <div className="bg-white rounded-lg shadow p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 md:mb-6">
          <div>
            <h2 className="text-base md:text-lg font-medium text-gray-900">Original URL</h2>
            <p className="text-sm md:text-base text-gray-600 break-all">{currentLink.longUrl}</p>
          </div>
          <div>
            <h2 className="text-base md:text-lg font-medium text-gray-900">Short URL</h2>
            <a
              href={`${import.meta.env.VITE_BASE_URL}/${currentLink.shortCode}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm md:text-base text-purple-600 hover:text-purple-800 break-all"
            >
              {currentLink.shortCode}
            </a>
          </div>
          <div>
            <h2 className="text-base md:text-lg font-medium text-gray-900">Total Clicks</h2>
            <p className="text-2xl md:text-3xl font-bold text-purple-600">
              {analytics.totalClicks}
            </p>
          </div>
          <div>
            <h2 className="text-base md:text-lg font-medium text-gray-900">Status</h2>
            <span
              className={`px-2 py-1 inline-flex text-xs leading-4 md:text-sm md:leading-5 font-semibold rounded-full ${
                currentLink.expiresAt && new Date(currentLink.expiresAt) < new Date()
                  ? 'bg-red-100 text-red-800'
                  : 'bg-green-100 text-green-800'
              }`}
            >
              {currentLink.expiresAt && new Date(currentLink.expiresAt) < new Date()
                ? 'Expired'
                : 'Active'}
            </span>
          </div>
        </div>
        
        {currentLink.qrCode && (
          <div className="mb-4 md:mb-6">
            <h2 className="text-base md:text-lg font-medium text-gray-900 mb-2">QR Code</h2>
            <div className="flex justify-center md:justify-start">
              <img
                src={currentLink.qrCode}
                alt="QR Code"
                className="w-24 h-24 md:w-32 md:h-32 border border-gray-200"
              />
            </div>
          </div>
        )}
      </div>
      
      {/* Charts Section */}
      <div className="space-y-6">
        {/* Line Chart for Clicks Over Time */}
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-bold text-purple-700 mb-3 md:mb-4">Clicks Over Time</h2>
          <div className="h-64 md:h-80">
            {clicksByDay.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={clicksByDay} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="_id" 
                    tickFormatter={(date) => new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 6 }} name="Clicks" />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-500 text-center py-8">No click data available for the past 30 days.</p>
            )}
          </div>
        </div>
        
        {/* Pie Chart for Devices and Bar Chart for Browsers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="bg-white rounded-lg shadow p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-bold text-purple-700 mb-3 md:mb-4">Devices</h2>
            <div className="h-56 md:h-64">
              {clicksByDevice.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={clicksByDevice}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={70}
                      fill="#8884d8"
                      dataKey="count"
                      nameKey="_id"
                      label={({ _id, percent }) =>
                        `${_id}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {clicksByDevice.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-gray-500 text-center py-8">No device data available.</p>
              )}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-bold text-purple-700 mb-3 md:mb-4">Browsers</h2>
            <div className="h-56 md:h-64">
              {clicksByBrowser.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={clicksByBrowser} 
                    margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
                    layout={window.innerWidth < 768 ? 'vertical' : 'horizontal'}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    {window.innerWidth < 768 ? (
                      <>
                        <XAxis type="number" tick={{ fontSize: 12 }} />
                        <YAxis dataKey="_id" type="category" tick={{ fontSize: 12 }} />
                      </>
                    ) : (
                      <>
                        <XAxis dataKey="_id" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                      </>
                    )}
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" name="Clicks" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-gray-500 text-center py-8">No browser data available.</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Bar Chart for Locations if available */}
        {clicksByCountry.length > 0 && (
          <div className="bg-white rounded-lg shadow p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-bold text-purple-700 mb-3 md:mb-4">Locations</h2>
            <div className="h-64 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={clicksByCountry} 
                  layout="vertical" 
                  margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" tick={{ fontSize: 12 }} />
                  <YAxis 
                    dataKey="_id" 
                    type="category" 
                    width={window.innerWidth < 768 ? 80 : 100} 
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" name="Clicks" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;
