import { useAppSelector, useAppDispatch } from '../store/hooks';
import {
  removeFromOrder,
  updateQuantity,
  confirmOrder,
} from '../store/slices/orderSlice';
import { orderStorage } from '../utils/orderStorage';
import { useState } from 'react';

export default function OrderSummary() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.order.items);
  const [showSuccess, setShowSuccess] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.originalPrice, 0);
  const totalDiscount = items.reduce((sum, item) => sum + item.discount, 0);
  const total = subtotal - totalDiscount;

  const handleConfirmOrder = () => {
    if (items.length === 0) return;

    dispatch(confirmOrder());
    const order = {
      id: `order-${Date.now()}`,
      items: [...items],
      subtotal,
      totalDiscount,
      total,
      timestamp: new Date().toISOString(),
    };
    orderStorage.saveOrder(order);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h2>
        <p className="text-gray-600">Your order is empty</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h2>
      {showSuccess && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">
          Order confirmed successfully!
        </div>
      )}
      <div className="space-y-3 mb-4">
        {items.map((item) => (
          <div key={item.pizza.id} className="border-b pb-3">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">
                  {item.pizza.name}
                </h4>
                <p className="text-sm text-gray-600">
                  ${item.pizza.price} × {item.quantity}
                </p>
                {item.discount > 0 && (
                  <p className="text-sm text-green-600">
                    Discount: -${item.discount.toFixed(2)}
                  </p>
                )}
              </div>
              <div className="text-right">
                <p className="font-semibold">
                  ${item.discountedPrice.toFixed(2)}
                </p>
                <div className="flex items-center space-x-1 mt-1">
                  <button
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          pizzaId: item.pizza.id,
                          quantity: item.quantity - 1,
                        })
                      )
                    }
                    className="w-6 h-6 bg-gray-200 rounded text-sm hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="text-sm w-8 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          pizzaId: item.pizza.id,
                          quantity: item.quantity + 1,
                        })
                      )
                    }
                    className="w-6 h-6 bg-gray-200 rounded text-sm hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => dispatch(removeFromOrder(item.pizza.id))}
                  className="text-red-600 text-xs mt-1 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="pt-4 space-y-2">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        {totalDiscount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount:</span>
            <span>-${totalDiscount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between text-xl font-bold text-gray-800 pt-2 border-t">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      <button
        onClick={handleConfirmOrder}
        className="w-full mt-4 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
      >
        Confirm Order
      </button>
    </div>
  );
}
