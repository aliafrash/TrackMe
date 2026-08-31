import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from 'recharts';
import { addThousandsSeparator, CURRENCY } from '../../utils/helper';

const COLORS = [
  '#875cf5',
  '#3b82f6',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#ec4899',
  '#8b5cf6',
  '#06b6d4',
];

const CustomPieTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-slate-900 text-white p-2.5 rounded-xl shadow-xl text-xs border border-slate-700">
        <p className="font-semibold">{data.name}</p>
        <p className="text-purple-300 font-medium">
          {CURRENCY} {addThousandsSeparator(data.value)}
        </p>
      </div>
    );
  }
  return null;
};

const ExpenseDonutChart = ({ data = [] }) => {
  if (!data || data.length === 0) {
    return (
      <div className="h-56 flex items-center justify-center text-xs text-slate-400">
        No category data available
      </div>
    );
  }

  // Format data for Recharts Pie
  const formattedData = data.map((item) => ({
    name: item._id || item.category || 'Other',
    value: item.totalAmount || item.amount || 0,
  }));

  return (
    <div className="w-full h-60 flex flex-col items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={formattedData}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={80}
            paddingAngle={4}
            dataKey="value"
          >
            {formattedData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                stroke="transparent"
              />
            ))}
          </Pie>
          <Tooltip content={<CustomPieTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseDonutChart;
