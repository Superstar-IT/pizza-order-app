import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterState, SortOption } from '../../types';

const initialState: FilterState & { sortBy: SortOption } = {
  searchQuery: '',
  selectedIngredient: '',
  maxPrice: 100,
  category: '',
  sortBy: 'name-asc',
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedIngredient: (state, action: PayloadAction<string>) => {
      state.selectedIngredient = action.payload;
    },
    setMaxPrice: (state, action: PayloadAction<number>) => {
      state.maxPrice = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setSortBy: (state, action: PayloadAction<SortOption>) => {
      state.sortBy = action.payload;
    },
    resetFilters: (state) => {
      state.searchQuery = '';
      state.selectedIngredient = '';
      state.maxPrice = 100;
      state.category = '';
      state.sortBy = 'name-asc';
    },
  },
});

export const {
  setSearchQuery,
  setSelectedIngredient,
  setMaxPrice,
  setCategory,
  setSortBy,
  resetFilters,
} = filterSlice.actions;
export default filterSlice.reducer;
