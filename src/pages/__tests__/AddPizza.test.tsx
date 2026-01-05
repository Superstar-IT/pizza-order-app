import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import AddPizza from '../AddPizza';
import pizzaReducer from '../../store/slices/pizzaSlice';
import filterReducer from '../../store/slices/filterSlice';
import orderReducer from '../../store/slices/orderSlice';

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const createMockStore = () => {
  return configureStore({
    reducer: {
      pizzas: pizzaReducer,
      filters: filterReducer,
      order: orderReducer,
    },
  });
};

const renderWithProviders = (component: React.ReactElement) => {
  const store = createMockStore();
  const result = render(
    <Provider store={store}>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        {component}
      </BrowserRouter>
    </Provider>
  );
  return { ...result, store };
};

describe('AddPizza', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should render form fields', () => {
    renderWithProviders(<AddPizza />);

    expect(screen.getByLabelText(/pizza name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/ingredients/i)).toBeInTheDocument();
  });

  it('should show validation errors for empty fields', async () => {
    renderWithProviders(<AddPizza />);

    const submitButton = screen.getByRole('button', { name: /add pizza/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(
        screen.getByText(/price must be a positive number/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/at least one ingredient is required/i)
      ).toBeInTheDocument();
    });
  });

  it('should submit valid form', async () => {
    const { store } = renderWithProviders(<AddPizza />);

    const nameInput = screen.getByLabelText(/pizza name/i);
    const priceInput = screen.getByLabelText(/price/i);
    const ingredientsInput = screen.getByLabelText(/ingredients/i);

    fireEvent.change(nameInput, {
      target: { value: 'Test Pizza' },
    });
    fireEvent.change(priceInput, {
      target: { value: '9.99' },
    });
    fireEvent.change(ingredientsInput, {
      target: { value: 'cheese, tomato' },
    });

    const submitButton = screen.getByRole('button', { name: /add pizza/i });
    fireEvent.click(submitButton);

    // Wait for the pizza to be added to the store
    await waitFor(() => {
      const state = store.getState();
      const pizzas = state.pizzas.pizzas;
      expect(pizzas.some((p) => p.name === 'Test Pizza')).toBe(true);
    });

    // Verify the pizza was added with correct data
    const state = store.getState();
    const addedPizza = state.pizzas.pizzas.find((p) => p.name === 'Test Pizza');
    expect(addedPizza).toBeDefined();
    expect(addedPizza?.price).toBe(9.99);
    expect(addedPizza?.ingredients).toEqual(['cheese', 'tomato']);

    // Verify navigate was called after the timeout
    jest.advanceTimersByTime(1000);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
