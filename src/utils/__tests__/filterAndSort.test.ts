import { filterPizzas, sortPizzas } from '../filterAndSort';
import { Pizza, SortOption } from '../../types';

const mockPizzas: Pizza[] = [
  {
    id: '1',
    name: 'Margherita',
    price: 5,
    ingredients: ['tomato', 'mozzarella'],
    category: 'classic',
  },
  {
    id: '2',
    name: 'Pepperoni',
    price: 7,
    ingredients: ['tomato', 'pepperoni'],
    category: 'classic',
  },
  {
    id: '3',
    name: 'Hawaiana',
    price: 6,
    ingredients: ['pineapple', 'ham'],
    category: 'specialty',
  },
];

describe('filterPizzas', () => {
  it('should filter by search query', () => {
    const result = filterPizzas(mockPizzas, 'margherita', '', 100, '');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Margherita');
  });

  it('should filter by ingredient', () => {
    const result = filterPizzas(mockPizzas, '', 'pepperoni', 100, '');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Pepperoni');
  });

  it('should filter by max price', () => {
    const result = filterPizzas(mockPizzas, '', '', 6, '');
    expect(result).toHaveLength(2);
    expect(result.every((p) => p.price <= 6)).toBe(true);
  });

  it('should filter by category', () => {
    const result = filterPizzas(mockPizzas, '', '', 100, 'specialty');
    expect(result).toHaveLength(1);
    expect(result[0].category).toBe('specialty');
  });
});

describe('sortPizzas', () => {
  it('should sort by name ascending', () => {
    const result = sortPizzas(mockPizzas, 'name-asc');
    expect(result[0].name).toBe('Hawaiana');
    expect(result[1].name).toBe('Margherita');
    expect(result[2].name).toBe('Pepperoni');
  });

  it('should sort by name descending', () => {
    const result = sortPizzas(mockPizzas, 'name-desc');
    expect(result[0].name).toBe('Pepperoni');
    expect(result[2].name).toBe('Hawaiana');
  });

  it('should sort by price ascending', () => {
    const result = sortPizzas(mockPizzas, 'price-asc');
    expect(result[0].price).toBe(5);
    expect(result[1].price).toBe(6);
    expect(result[2].price).toBe(7);
  });

  it('should sort by price descending', () => {
    const result = sortPizzas(mockPizzas, 'price-desc');
    expect(result[0].price).toBe(7);
    expect(result[2].price).toBe(5);
  });
});
