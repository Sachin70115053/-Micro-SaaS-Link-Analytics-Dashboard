

import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { format } from 'date-fns';

const ClicksChart = ({ data = [] }) => {
  return (
    <div className="p-4 bg-white rounded-xl shadow">
      <h3 className="text-lg font-semibold text-purple-700 mb-4">Clicks Over Time</h3>
      <div className="h-64">
        {data && data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              {/* Ensure that the x-axis key matches your aggregated data.
                  If your backend returns dates as `_id` then change dataKey to "_id" */}
              <XAxis 
                dataKey="_id" 
                tickFormatter={(date) => format(new Date(date), 'MMM dd')}
              />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="count" 
                stroke="#7c3aed"
                strokeWidth={2}
                dot={{ fill: '#7c3aed' }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500 text-center">No data available for this chart.</p>
        )}
      </div>
    </div>
  );
};

export default ClicksChart;
