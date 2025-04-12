// import { Link } from 'react-router-dom';
// import { formatDate } from '../../utils/dateFormatter';
// import QRCodeModal from '../QRCodeModal/QRCodeModal';
// import React from 'react';

// const LinkTable = ({ links }) => {
//   return (
//     <div className="overflow-x-auto rounded-lg border border-purple-100">
//       <table className="min-w-full divide-y divide-purple-100">
//         <thead className="bg-purple-50">
//           <tr>
//             {['Original URL', 'Short URL', 'Clicks', 'Created', 'Status', 'QR Code'].map((header) => (
//               <th key={header} className="px-6 py-3 text-left text-xs font-medium text-purple-700 uppercase">
//                 {header}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-purple-100">
//           {links.map((link) => (
//             <tr key={link._id}>
//               <td className="px-6 py-4 max-w-xs truncate">
//                 <a href={link.longUrl} target="_blank" rel="noopener" className="text-purple-600 hover:underline">
//                   {link.longUrl}
//                 </a>
//               </td>
//               <td className="px-6 py-4">
//                 <a
//                   href={`${import.meta.env.VITE_BASE_URL}/${link.shortCode}`}
//                   target="_blank"
//                   rel="noopener"
//                   className="text-purple-600 hover:underline"
//                 >
//                   {link.shortCode}
//                 </a>
//               </td>
//               <td className="px-6 py-4 font-medium">{link.clicks}</td>
//               <td className="px-6 py-4">{formatDate(link.createdAt)}</td>
//               <td className="px-6 py-4">
//                 <span className={`px-2 py-1 rounded-full text-xs ${
//                   new Date(link.expiresAt) < new Date() 
//                     ? 'bg-red-100 text-red-800' 
//                     : 'bg-green-100 text-green-800'
//                 }`}>
//                   {new Date(link.expiresAt) < new Date() ? 'Expired' : 'Active'}
//                 </span>
//               </td>
//               <td className="px-6 py-4">
//                 <QRCodeModal url={`${import.meta.env.VITE_BASE_URL}/${link.shortCode}`} />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default LinkTable;



import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/dateFormatter';
import QRCodeModal from '../QRCodeModal/QRCodeModal';
import React from 'react';

const LinkTable = ({ links }) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-purple-100">
      {/* Desktop Table */}
      <table className="hidden md:table min-w-full divide-y divide-purple-100">
        <thead className="bg-purple-50">
          <tr>
            {['Original URL', 'Short URL', 'Clicks', 'Created', 'Status', 'QR Code'].map((header) => (
              <th key={header} className="px-3 py-3 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-purple-100">
          {links.map((link) => (
            <tr key={link._id}>
              <td className="px-3 py-4 max-w-xs truncate">
                <a href={link.longUrl} target="_blank" rel="noopener" className="text-purple-600 hover:underline">
                  {link.longUrl}
                </a>
              </td>
              <td className="px-3 py-4">
                <a
                  href={`${import.meta.env.VITE_BASE_URL}/${link.shortCode}`}
                  target="_blank"
                  rel="noopener"
                  className="text-purple-600 hover:underline"
                >
                  {link.shortCode}
                </a>
              </td>
              <td className="px-3 py-4 font-medium">{link.clicks}</td>
              <td className="px-3 py-4 whitespace-nowrap">{formatDate(link.createdAt)}</td>
              <td className="px-3 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  new Date(link.expiresAt) < new Date() 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {new Date(link.expiresAt) < new Date() ? 'Expired' : 'Active'}
                </span>
              </td>
              <td className="px-3 py-4 whitespace-nowrap">
                <QRCodeModal url={`${import.meta.env.VITE_BASE_URL}/${link.shortCode}`} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4 p-4">
        {links.map((link) => (
          <div key={link._id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-purple-600 truncate">
                  <a href={link.longUrl} target="_blank" rel="noopener">
                    {link.longUrl}
                  </a>
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    new Date(link.expiresAt) < new Date() 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {new Date(link.expiresAt) < new Date() ? 'Expired' : 'Active'}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatDate(link.createdAt)}
                  </span>
                </div>
              </div>
              <QRCodeModal url={`${import.meta.env.VITE_BASE_URL}/${link.shortCode}`} />
            </div>
            
            <div className="mt-3 flex items-center justify-between">
              <a
                href={`${import.meta.env.VITE_BASE_URL}/${link.shortCode}`}
                target="_blank"
                rel="noopener"
                className="text-sm text-purple-600 hover:underline"
              >
                {link.shortCode}
              </a>
              <span className="text-sm font-medium">
                {link.clicks} {link.clicks === 1 ? 'click' : 'clicks'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LinkTable;