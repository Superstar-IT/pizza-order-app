import { useMemo, useState } from 'react';
import OrderDistributionChart from '../components/OrderDistributionChart';
import OrderSummary from '../components/OrderSummary';
import PizzaCard from '../components/PizzaCard';
import PriceChart from '../components/PriceChart';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  setCategory,
  setMaxPrice,
  setSearchQuery,
  setSelectedIngredient,
  setSortBy,
} from '../store/slices/filterSlice';
import { filterPizzas, sortPizzas } from '../utils/filterAndSort';

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const pizzas = useAppSelector((state) => state.pizzas.pizzas);
  const filters = useAppSelector((state) => state.filters);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const allIngredients = useMemo(() => {
    const ingredients = new Set<string>();
    pizzas.forEach((pizza) => {
      pizza.ingredients.forEach((ing) => ingredients.add(ing));
    });
    return Array.from(ingredients).sort();
  }, [pizzas]);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    pizzas.forEach((pizza) => cats.add(pizza.category));
    return Array.from(cats).sort();
  }, [pizzas]);

  const filteredAndSortedPizzas = useMemo(() => {
    const filtered = filterPizzas(
      pizzas,
      filters.searchQuery,
      filters.selectedIngredient,
      filters.maxPrice,
      filters.category
    );
    return sortPizzas(filtered, filters.sortBy);
  }, [pizzas, filters]);

  const maxPriceInMenu = useMemo(() => {
    return Math.max(...pizzas.map((p) => p.price), 0);
  }, [pizzas]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-md mb-6">
            <button
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className="w-full flex items-center justify-between p-6 text-left focus:outline-none rounded-t-lg"
              aria-expanded={isFiltersOpen}
            >
              <h2 className="text-2xl font-bold text-gray-800">
                Filters & Search
              </h2>
              <svg
                className={`w-6 h-6 text-gray-600 transition-transform duration-200 ${
                  isFiltersOpen ? 'transform rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isFiltersOpen && (
              <div className="px-6 pb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Search
                </label>
                <input
                  type="text"
                  value={filters.searchQuery}
                  onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                  placeholder="Search pizzas..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sort By
                </label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => dispatch(setSortBy(e.target.value as any))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                >
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
                  <option value="price-asc">Price (Low to High)</option>
                  <option value="price-desc">Price (High to Low)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Price: ${filters.maxPrice}
                </label>
                <input
                  type="range"
                  min="0"
                  max={maxPriceInMenu}
                  step="0.5"
                  value={filters.maxPrice}
                  onChange={(e) =>
                    dispatch(setMaxPrice(parseFloat(e.target.value)))
                  }
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Filter by Ingredient
                </label>
                <select
                  value={filters.selectedIngredient}
                  onChange={(e) =>
                    dispatch(setSelectedIngredient(e.target.value))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 capitalize"
                >
                  <option value="">All Ingredients</option>
                  {allIngredients.map((ing) => (
                    <option key={ing} value={ing} className="capitalize">
                      {ing}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Filter by Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => dispatch(setCategory(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 capitalize"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat} className="capitalize">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
                </div>
              </div>
            )}
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Menu ({filteredAndSortedPizzas.length} pizzas)
            </h2>
            {filteredAndSortedPizzas.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <p className="text-gray-600">
                  No pizzas found matching your filters.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {filteredAndSortedPizzas.map((pizza) => (
                  <PizzaCard key={pizza.id} pizza={pizza} />
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            <PriceChart pizzas={pizzas} />
            <OrderDistributionChart />
          </div>
        </div>

        <div className="lg:w-96">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
