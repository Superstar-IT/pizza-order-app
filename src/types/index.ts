export interface Pizza {
  id: string;
  name: string;
  price: number;
  ingredients: string[];
  category: string;
  imageUrl?: string;
}

export interface OrderItem {
  pizza: Pizza;
  quantity: number;
  originalPrice: number;
  discount: number;
  discountedPrice: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  subtotal: number;
  totalDiscount: number;
  total: number;
  timestamp: string;
}

export type SortOption = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc';

export interface FilterState {
  searchQuery: string;
  selectedIngredient: string;
  maxPrice: number;
  category: string;
}
