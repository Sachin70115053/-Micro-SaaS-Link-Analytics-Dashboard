

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getLinks, resetCurrentLink } from '../store/slices/linksSlice';
import Spinner from '../components/layout/Spinner';
import Pagination from '../components/layout/Pagination';
import SearchBox from '../components/layout/SearchBox';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { links, totalLinks, status, currentPage, totalPages } = useSelector(
    (state) => state.links
  );

  // ✅ Correctly reading auth status
  const { isAuthenticated, status: authStatus } = useSelector((state) => state.auth);
  const authLoading = authStatus === 'loading';

  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
    } else if (!authLoading && isAuthenticated) {
      dispatch(getLinks({ page: 1, search }));
      dispatch(resetCurrentLink());
    }
  }, [authLoading, isAuthenticated, dispatch, search, navigate]);

  const handlePageChange = (page) => {
    dispatch(getLinks({ page, search }));
  };

  if (authLoading || (status === 'loading' && links.length === 0)) {
    return <Spinner />;
  }

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-purple-700">My Links</h1>
        <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
          <div className="flex-1 min-w-[200px]">
            <SearchBox value={search} onChange={setSearch} />
          </div>
          <Link
            to="/create-link"
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors whitespace-nowrap text-center text-sm sm:text-base"
          >
            + Create New
          </Link>
        </div>
      </div>

      {/* Empty State */}
      {Array.isArray(links) && links.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 sm:p-8 text-center">
          <p className="text-gray-600 mb-4">
            No links found. Start by creating your first short link!
          </p>
          <Link
            to="/create-link"
            className="inline-block px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors text-sm sm:text-base"
          >
            Create Link
          </Link>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-purple-50">
                  <tr>
                    {['Original URL', 'Short URL', 'Clicks', 'Created', 'Status', 'Actions'].map((header) => (
                      <th
                        key={header}
                        className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-purple-700 uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {links.map((link) => (
                    <tr key={link._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 sm:px-6 py-4 max-w-xs truncate">
                        <a
                          href={link.longUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-600 hover:text-purple-800 hover:underline text-sm sm:text-base"
                        >
                          {link.longUrl}
                        </a>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <a
                          href={`${import.meta.env.VITE_BASE_URL}/${link.shortCode}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-600 hover:text-purple-800 hover:underline text-sm sm:text-base"
                        >
                          {link.shortCode}
                        </a>
                      </td>
                      <td className="px-4 sm:px-6 py-4 font-medium text-sm sm:text-base">
                        {link.clicks}
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm sm:text-base">
                        {new Date(link.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium ${
                            link.expiresAt && new Date(link.expiresAt) < new Date()
                              ? 'bg-red-100 text-red-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {link.expiresAt && new Date(link.expiresAt) < new Date()
                            ? 'Expired'
                            : 'Active'}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <Link
                          to={`/analytics/${link._id}`}
                          className="text-purple-600 hover:text-purple-800 font-medium text-sm sm:text-base"
                        >
                          View →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4 mb-6">
            {links.map((link) => (
              <div key={link._id} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1 min-w-0">
                    <a
                      href={link.longUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:text-purple-800 hover:underline text-sm truncate block mb-1"
                    >
                      {link.longUrl}
                    </a>
                    <a
                      href={`${import.meta.env.VITE_BASE_URL}/${link.shortCode}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:text-purple-800 hover:underline text-sm block mb-2"
                    >
                      {link.shortCode}
                    </a>
                  </div>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      link.expiresAt && new Date(link.expiresAt) < new Date()
                        ? 'bg-red-100 text-red-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {link.expiresAt && new Date(link.expiresAt) < new Date()
                      ? 'Expired'
                      : 'Active'}
                  </span>
                </div>

                <div className="flex justify-between items-center mt-3 text-sm">
                  <div className="flex items-center gap-4">
                    <span className="font-medium">
                      {link.clicks} {link.clicks === 1 ? 'click' : 'clicks'}
                    </span>
                    <span>
                      {new Date(link.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <Link
                    to={`/analytics/${link._id}`}
                    className="text-purple-600 hover:text-purple-800 font-medium"
                  >
                    View →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalLinks}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
