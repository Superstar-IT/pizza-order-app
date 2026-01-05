import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pizza } from '../../types';
import pizzasData from '../../data/pizzas.json';

interface PizzaState {
  pizzas: Pizza[];
}

const initialState: PizzaState = {
  pizzas: pizzasData as Pizza[],
};

const pizzaSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    addPizza: (state, action: PayloadAction<Pizza>) => {
      state.pizzas.push(action.payload);
    },
  },
});

export const { addPizza } = pizzaSlice.actions;
export default pizzaSlice.reducer;
