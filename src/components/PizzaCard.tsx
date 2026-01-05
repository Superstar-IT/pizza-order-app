import { Link } from 'react-router-dom';
import { Pizza } from '../types';
import { useAppDispatch } from '../store/hooks';
import { addToOrder } from '../store/slices/orderSlice';
import { useState } from 'react';

interface PizzaCardProps {
  pizza: Pizza;
}

export default function PizzaCard({ pizza }: PizzaCardProps) {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);

  const handleAddToOrder = () => {
    dispatch(addToOrder({ pizza, quantity }));
    setQuantity(1);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
      <Link to={`/pizza/${pizza.id}`}>
        <img
          src={pizza.imageUrl || '/placeholder-pizza.jpg'}
          alt={pizza.name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://via.placeholder.com/400x300?text=Pizza';
          }}
        />
      </Link>
      <div className="p-4 justify-between flex-1 flex flex-col">
        <div>
          <Link to={`/pizza/${pizza.id}`}>
            <h3 className="text-xl font-semibold text-gray-800 hover:text-red-600">
              {pizza.name}
            </h3>
          </Link>
          <p className="text-gray-600 text-sm mt-1 capitalize">
            {pizza.ingredients.join(', ')}
          </p>
        </div>
        <div className="mt-3 flex flex-row lg:flex-col items-center justify-between gap-2">
          <div className="w-full flex items-center space-x-2 lg:justify-between">
            <span className="text-xl font-bold text-red-600">
              ${pizza.price}
            </span>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value) || 1))
              }
              className="w-20 px-2 py-1 border border-gray-300 rounded text-center"
            />
          </div>
          <button
            onClick={handleAddToOrder}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors text-xs w-full"
          >
            Add to Order
          </button>
        </div>
      </div>
    </div>
  );
}
