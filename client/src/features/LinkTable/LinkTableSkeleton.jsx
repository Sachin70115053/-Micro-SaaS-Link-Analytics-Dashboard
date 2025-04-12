import React from 'react';

export const LinkTableSkeleton = () => (
  <div className="space-y-4">
    {/* Desktop Table Skeleton */}
    <div className="hidden md:block overflow-x-auto rounded-lg border border-purple-100">
      <table className="min-w-full divide-y divide-purple-100">
        <thead className="bg-purple-50">
          <tr>
            {['Original URL', 'Short URL', 'Clicks', 'Created', 'Status', 'QR Code'].map((header) => (
              <th key={header} className="px-3 py-3 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">
                <div className="h-4 w-3/4 skeleton-loader"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-purple-100">
          {[...Array(5)].map((_, i) => (
            <tr key={i}>
              <td className="px-3 py-4">
                <div className="h-4 w-full skeleton-loader"></div>
              </td>
              <td className="px-3 py-4">
                <div className="h-4 w-3/4 skeleton-loader"></div>
              </td>
              <td className="px-3 py-4">
                <div className="h-4 w-1/2 skeleton-loader mx-auto"></div>
              </td>
              <td className="px-3 py-4">
                <div className="h-4 w-3/4 skeleton-loader"></div>
              </td>
              <td className="px-3 py-4">
                <div className="h-6 w-16 skeleton-loader rounded-full"></div>
              </td>
              <td className="px-3 py-4">
                <div className="h-8 w-8 skeleton-loader rounded-md mx-auto"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Mobile Card Skeleton */}
    <div className="md:hidden space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="bg-white p-4 rounded-lg shadow animate-pulse">
          <div className="flex justify-between items-start">
            <div className="flex-1 min-w-0 space-y-2">
              <div className="h-4 w-full skeleton-loader"></div>
              <div className="flex gap-2">
                <div className="h-5 w-16 skeleton-loader rounded-full"></div>
                <div className="h-5 w-20 skeleton-loader"></div>
              </div>
            </div>
            <div className="h-8 w-8 skeleton-loader rounded-md"></div>
          </div>
          
          <div className="mt-3 flex items-center justify-between">
            <div className="h-4 w-24 skeleton-loader"></div>
            <div className="h-4 w-12 skeleton-loader"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);