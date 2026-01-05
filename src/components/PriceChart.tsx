import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Pizza } from '../types';

interface PriceChartProps {
  pizzas: Pizza[];
}

export default function PriceChart({ pizzas }: PriceChartProps) {
  const data = pizzas.map((pizza) => ({
    name: pizza.name,
    price: pizza.price,
  }));

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Pizza Prices</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="price" fill="#dc2626" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
