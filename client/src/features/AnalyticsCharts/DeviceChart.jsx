
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#7c3aed', '#6d28d9', '#5b21b6'];

const DeviceChart = ({ data = [] }) => (
  <div className="p-4 bg-white rounded-xl shadow">
    <h3 className="text-lg font-semibold text-purple-700 mb-4">Devices Breakdown</h3>
    <div className="h-64">
      {data && data.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="count"
              nameKey="_id"
              label={({ _id, percent }) =>
                `${_id}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-gray-500 text-center">No device data available.</p>
      )}
    </div>
  </div>
);

export default DeviceChart;
