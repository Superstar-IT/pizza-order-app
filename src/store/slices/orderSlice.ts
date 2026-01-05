import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pizza, OrderItem, Order } from '../../types';

interface OrderState {
  items: OrderItem[];
  orders: Order[];
}

const initialState: OrderState = {
  items: [],
  orders: [],
};

// Discount logic: 3+ of the same pizza = 10% discount on that line item
const calculateLineItemDiscount = (quantity: number, price: number): number => {
  if (quantity >= 3) {
    return price * quantity * 0.1; // 10% discount
  }
  return 0;
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addToOrder: (
      state,
      action: PayloadAction<{ pizza: Pizza; quantity: number }>
    ) => {
      const { pizza, quantity } = action.payload;
      const existingItem = state.items.find(
        (item) => item.pizza.id === pizza.id
      );

      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.originalPrice =
          existingItem.pizza.price * existingItem.quantity;
        existingItem.discount = calculateLineItemDiscount(
          existingItem.quantity,
          existingItem.pizza.price
        );
        existingItem.discountedPrice =
          existingItem.originalPrice - existingItem.discount;
      } else {
        const originalPrice = pizza.price * quantity;
        const discount = calculateLineItemDiscount(quantity, pizza.price);
        const discountedPrice = originalPrice - discount;

        state.items.push({
          pizza,
          quantity,
          originalPrice,
          discount,
          discountedPrice,
        });
      }
    },
    removeFromOrder: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.pizza.id !== action.payload
      );
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ pizzaId: string; quantity: number }>
    ) => {
      const { pizzaId, quantity } = action.payload;
      const item = state.items.find((item) => item.pizza.id === pizzaId);

      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter((item) => item.pizza.id !== pizzaId);
        } else {
          item.quantity = quantity;
          item.originalPrice = item.pizza.price * quantity;
          item.discount = calculateLineItemDiscount(quantity, item.pizza.price);
          item.discountedPrice = item.originalPrice - item.discount;
        }
      }
    },
    confirmOrder: (state) => {
      if (state.items.length === 0) return;

      const subtotal = state.items.reduce(
        (sum, item) => sum + item.originalPrice,
        0
      );
      const totalDiscount = state.items.reduce(
        (sum, item) => sum + item.discount,
        0
      );
      const total = subtotal - totalDiscount;

      const newOrder: Order = {
        id: `order-${Date.now()}`,
        items: [...state.items],
        subtotal,
        totalDiscount,
        total,
        timestamp: new Date().toISOString(),
      };

      state.orders.push(newOrder);
      state.items = [];
    },
    clearOrder: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToOrder,
  removeFromOrder,
  updateQuantity,
  confirmOrder,
  clearOrder,
} = orderSlice.actions;
export default orderSlice.reducer;
