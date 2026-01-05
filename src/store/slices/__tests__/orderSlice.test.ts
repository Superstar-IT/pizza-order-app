import orderReducer, {
  addToOrder,
  removeFromOrder,
  updateQuantity,
  confirmOrder,
  clearOrder,
} from '../orderSlice';
import { Pizza } from '../../../types';

const mockPizza: Pizza = {
  id: '1',
  name: 'Margherita',
  price: 5,
  ingredients: ['tomato', 'mozzarella'],
  category: 'classic',
};

describe('orderSlice', () => {
  const initialState = {
    items: [],
    orders: [],
  };

  it('should add pizza to order', () => {
    const action = addToOrder({ pizza: mockPizza, quantity: 2 });
    const state = orderReducer(initialState, action);

    expect(state.items).toHaveLength(1);
    expect(state.items[0].pizza.id).toBe('1');
    expect(state.items[0].quantity).toBe(2);
    expect(state.items[0].originalPrice).toBe(10);
    expect(state.items[0].discount).toBe(0); // No discount for 2 items
  });

  it('should apply discount for 3+ items', () => {
    const action = addToOrder({ pizza: mockPizza, quantity: 3 });
    const state = orderReducer(initialState, action);

    expect(state.items[0].quantity).toBe(3);
    expect(state.items[0].originalPrice).toBe(15);
    expect(state.items[0].discount).toBe(1.5); // 10% of 15
    expect(state.items[0].discountedPrice).toBe(13.5);
  });

  it('should update quantity when adding same pizza', () => {
    const state1 = orderReducer(
      initialState,
      addToOrder({ pizza: mockPizza, quantity: 2 })
    );
    const state2 = orderReducer(
      state1,
      addToOrder({ pizza: mockPizza, quantity: 1 })
    );

    expect(state2.items).toHaveLength(1);
    expect(state2.items[0].quantity).toBe(3);
    expect(state2.items[0].discount).toBeGreaterThan(0);
  });

  it('should remove pizza from order', () => {
    const state1 = orderReducer(
      initialState,
      addToOrder({ pizza: mockPizza, quantity: 1 })
    );
    const state2 = orderReducer(state1, removeFromOrder('1'));

    expect(state2.items).toHaveLength(0);
  });

  it('should update quantity', () => {
    const state1 = orderReducer(
      initialState,
      addToOrder({ pizza: mockPizza, quantity: 1 })
    );
    const state2 = orderReducer(
      state1,
      updateQuantity({ pizzaId: '1', quantity: 5 })
    );

    expect(state2.items[0].quantity).toBe(5);
    expect(state2.items[0].discount).toBeGreaterThan(0);
  });

  it('should remove item when quantity is 0', () => {
    const state1 = orderReducer(
      initialState,
      addToOrder({ pizza: mockPizza, quantity: 1 })
    );
    const state2 = orderReducer(
      state1,
      updateQuantity({ pizzaId: '1', quantity: 0 })
    );

    expect(state2.items).toHaveLength(0);
  });

  it('should confirm order', () => {
    const state1 = orderReducer(
      initialState,
      addToOrder({ pizza: mockPizza, quantity: 1 })
    );
    const state2 = orderReducer(state1, confirmOrder());

    expect(state2.items).toHaveLength(0);
    expect(state2.orders).toHaveLength(1);
    expect(state2.orders[0].items).toHaveLength(1);
  });

  it('should clear order', () => {
    const state1 = orderReducer(
      initialState,
      addToOrder({ pizza: mockPizza, quantity: 1 })
    );
    const state2 = orderReducer(state1, clearOrder());

    expect(state2.items).toHaveLength(0);
  });
});
