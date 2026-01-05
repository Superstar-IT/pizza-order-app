import { configureStore } from '@reduxjs/toolkit';
import pizzaReducer from './slices/pizzaSlice';
import filterReducer from './slices/filterSlice';
import orderReducer from './slices/orderSlice';

export const store = configureStore({
  reducer: {
    pizzas: pizzaReducer,
    filters: filterReducer,
    order: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
