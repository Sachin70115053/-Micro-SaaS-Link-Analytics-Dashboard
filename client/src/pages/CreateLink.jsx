
// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { createLink } from '../store/slices/linksSlice';
// import { Link } from 'react-router-dom';

// const CreateLink = () => {
//   const dispatch = useDispatch();
//   const status = useSelector((state) => state.links.status.create); // ✅ updated

//   const [formData, setFormData] = useState({
//     longUrl: '',
//     customAlias: '',
//     expiresAt: ''
//   });

//   const { longUrl, customAlias, expiresAt } = formData;

//   const onChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const onSubmit = (e) => {
//     e.preventDefault();
//     dispatch(createLink(formData));
//     setFormData({
//       longUrl: '',
//       customAlias: '',
//       expiresAt: ''
//     });
//   };

//   return (
//     <div className="max-w-2xl mx-auto">
//       <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
//         <div className="text-center mb-6">
//           <h1 className="text-3xl font-bold text-purple-700">Create Short Link</h1>
//           <p className="text-gray-600 mt-2">
//             Shorten your long URLs and track their performance
//           </p>
//         </div>

//         <form onSubmit={onSubmit} className="space-y-6">
//           <div>
//             <label htmlFor="longUrl" className="block text-sm font-medium text-gray-700">
//               Long URL
//             </label>
//             <input
//               type="url"
//               id="longUrl"
//               name="longUrl"
//               value={longUrl}
//               onChange={onChange}
//               required
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2 border"
//               placeholder="https://example.com/very-long-url"
//             />
//           </div>

//           <div>
//             <label htmlFor="customAlias" className="block text-sm font-medium text-gray-700">
//               Custom Alias (optional)
//             </label>
//             <input
//               type="text"
//               id="customAlias"
//               name="customAlias"
//               value={customAlias}
//               onChange={onChange}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2 border"
//               placeholder="my-custom-link"
//             />
//           </div>

//           <div>
//             <label htmlFor="expiresAt" className="block text-sm font-medium text-gray-700">
//               Expiration Date (optional)
//             </label>
//             <input
//               type="datetime-local"
//               id="expiresAt"
//               name="expiresAt"
//               value={expiresAt}
//               onChange={onChange}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2 border"
//             />
//           </div>

//           <div>
//             <button
//               type="submit"
//               disabled={status === 'loading'}
//               className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {status === 'loading' ? 'Creating...' : 'Create Short Link'}
//             </button>
//           </div>
//         </form>

//         <div className="mt-6 text-center">
//           <Link
//             to="/dashboard"
//             className="text-purple-600 hover:text-purple-800 font-medium"
//           >
//             Back to Dashboard
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateLink;

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createLink } from '../store/slices/linksSlice';
import { Link } from 'react-router-dom';

const CreateLink = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.links.status.create); // ✅ updated

  const [formData, setFormData] = useState({
    longUrl: '',
    customAlias: '',
    expiresAt: ''
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const { longUrl, customAlias, expiresAt } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setErrorMsg('');
    setSuccessMsg('');
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!longUrl) {
      setErrorMsg('Long URL is required');
      return;
    }

    try {
      await dispatch(createLink(formData)).unwrap();
      setSuccessMsg('Link created successfully. Now you can go back to the dashboard to see the link.');
      setFormData({
        longUrl: '',
        customAlias: '',
        expiresAt: ''
      });
    } catch (error) {
      console.error(error);
      setErrorMsg(error?.message || 'Failed to create link. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-purple-700">Create Short Link</h1>
          <p className="text-gray-600 mt-2">
            Shorten your long URLs and track their performance
          </p>
        </div>

        {/* Show Success Message */}
        {successMsg && (
          <div className="mb-4 p-2 text-green-700 text-sm border border-green-300 bg-green-50 rounded">
            {successMsg}{' '}
            <Link to="/dashboard" className="text-purple-600 font-medium underline hover:text-purple-800">
              Go to dashboard
            </Link>
          </div>
        )}

        {/* Show Error Message */}
        {errorMsg && (
          <div className="mb-4 p-2 text-red-700 text-sm border border-red-300 bg-red-50 rounded">
            {errorMsg}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label htmlFor="longUrl" className="block text-sm font-medium text-gray-700">
              Long URL
            </label>
            <input
              type="url"
              id="longUrl"
              name="longUrl"
              value={longUrl}
              onChange={onChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2 border"
              placeholder="https://example.com/very-long-url"
            />
          </div>

          <div>
            <label htmlFor="customAlias" className="block text-sm font-medium text-gray-700">
              Custom Alias (optional)
            </label>
            <input
              type="text"
              id="customAlias"
              name="customAlias"
              value={customAlias}
              onChange={onChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2 border"
              placeholder="my-custom-link"
            />
          </div>

          <div>
            <label htmlFor="expiresAt" className="block text-sm font-medium text-gray-700">
              Expiration Date (optional)
            </label>
            <input
              type="datetime-local"
              id="expiresAt"
              name="expiresAt"
              value={expiresAt}
              onChange={onChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2 border"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Creating...' : 'Create Short Link'}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <Link
            to="/dashboard"
            className="text-purple-600 hover:text-purple-800 font-medium"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateLink;
