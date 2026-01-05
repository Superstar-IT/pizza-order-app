import { useParams, Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { addToOrder } from '../store/slices/orderSlice';
import { useState } from 'react';

export default function PizzaDetails() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const pizzas = useAppSelector((state) => state.pizzas.pizzas);
  const [quantity, setQuantity] = useState(1);

  const pizza = pizzas.find((p) => p.id === id);

  if (!pizza) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Pizza not found
        </h2>
        <Link to="/" className="text-red-600 hover:underline">
          Back to Menu
        </Link>
      </div>
    );
  }

  const handleAddToOrder = () => {
    dispatch(addToOrder({ pizza, quantity }));
    setQuantity(1);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="md:flex">
        <div className="md:w-1/2">
          <img
            src={pizza.imageUrl || '/placeholder-pizza.jpg'}
            alt={pizza.name}
            className="w-full h-64 md:h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://via.placeholder.com/400x300?text=Pizza';
            }}
          />
        </div>
        <div className="md:w-1/2 p-8">
          <Link
            to="/"
            className="text-red-600 hover:underline mb-4 inline-block"
          >
            ← Back to Menu
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {pizza.name}
          </h1>
          <div className="mb-4">
            <span className="text-3xl font-bold text-red-600">
              ${pizza.price}
            </span>
            <span className="text-gray-600 ml-2">per pizza</span>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Ingredients
            </h3>
            <div className="flex flex-wrap gap-2">
              {pizza.ingredients.map((ingredient) => (
                <span
                  key={ingredient}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {ingredient}
                </span>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
              {pizza.category}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label htmlFor="quantity" className="text-gray-700 font-medium">
                Quantity:
              </label>
              <input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                }
                className="w-20 px-3 py-2 border border-gray-300 rounded text-center"
              />
            </div>
            <button
              onClick={handleAddToOrder}
              className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Add to Order
            </button>
          </div>
          {quantity >= 3 && (
            <div className="mt-4 p-3 bg-green-100 text-green-800 rounded">
              🎉 You'll get a 10% discount on this pizza for ordering 3 or more!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
