import { Pizza, SortOption } from '../types';

export const filterPizzas = (
  pizzas: Pizza[],
  searchQuery: string,
  selectedIngredient: string,
  maxPrice: number,
  category: string
): Pizza[] => {
  return pizzas.filter((pizza) => {
    const matchesSearch =
      pizza.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pizza.ingredients.some((ing) =>
        ing.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesIngredient =
      !selectedIngredient || pizza.ingredients.includes(selectedIngredient);

    const matchesPrice = pizza.price <= maxPrice;

    const matchesCategory = !category || pizza.category === category;

    return (
      matchesSearch && matchesIngredient && matchesPrice && matchesCategory
    );
  });
};

export const sortPizzas = (pizzas: Pizza[], sortBy: SortOption): Pizza[] => {
  const sorted = [...pizzas];

  switch (sortBy) {
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    default:
      return sorted;
  }
};
