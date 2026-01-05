import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';
import { useAppSelector } from '../store/hooks';

const COLORS = [
  '#dc2626',
  '#ea580c',
  '#f59e0b',
  '#eab308',
  '#84cc16',
  '#22c55e',
];

export default function OrderDistributionChart() {
  const items = useAppSelector((state) => state.order.items);

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Order Distribution
        </h3>
        <p className="text-gray-600">No items in order</p>
      </div>
    );
  }

  const data = items.map((item) => ({
    name: item.pizza.name,
    value: item.quantity,
    total: item.discountedPrice,
  }));

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        Order Distribution (by Quantity)
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
