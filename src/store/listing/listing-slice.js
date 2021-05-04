import { createSlice } from '@reduxjs/toolkit'

export const listingSlice = createSlice({
  name: 'listing',
  initialState: {
    basket: [],
    items: [],
    filteredItems: [],
    companies: [],
    activePage: 1,
    sorting: 'Price low to high',
    brandsFilter: [],
    tagsFilter: [],
    typeFilter: null,
  },
  reducers: {
    setSorting: (state, action) => {
      state.sorting = action.payload;
    },
    addBrandsFilter: (state, action) => {
      state.brandsFilter.push(action.payload);
    },
    addTagsFilter: (state, action) => {
      state.tagsFilter.push(action.payload);
    },
    setTypeFilter: (state, action) => {
      state.typeFilter = action.payload;
    },
    removeBrandsFilter: (state, action) => {
      const removedBrand = action.payload;

      let removedIndex = state.brandsFilter.findIndex(brandFilter => {
        return brandFilter === removedBrand;
      });

      state.brandsFilter.splice(removedIndex, 1);
    },
    removeTagsFilter: (state, action) => {
      const removedTag = action.payload;

      let removedIndex = state.tagsFilter.findIndex(tagFilter => {
        return tagFilter === removedTag;
      });

      state.tagsFilter.splice(removedIndex, 1);
    },
    addProduct: (state, action) => {
      state.basket.push(action.payload);
    },
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setFilteredItems: (state, action) => {
      state.filteredItems = action.payload;
    },
    setCompanies: (state, action) => {
      state.companies = action.payload;
    },
    setActivePage: (state, action) => {
      state.activePage = action.payload;
    },
    increaseItemQuantity: (state, action) => {
      const increasedProduct = action.payload;

      let basketProduct = state.basket.find(product => {
        return product.added === increasedProduct.added;
      });

      basketProduct.quantity++;
    },
    decreaseItemQuantity: (state, action) => {
      const decreasedProduct = action.payload;

      let basketProduct = state.basket.find(product => {
        return product.added === decreasedProduct.added;
      });

      basketProduct.quantity--;
    },
    removeProduct: (state, action) => {
      const removedProduct = action.payload;

      const removedIndex = state.basket.findIndex(product => {
        return product.added === removedProduct.added
      });

      state.basket.splice(removedIndex, 1);
    },
    clearBrandsFilter: (state) => {
      state.brandsFilter = [];
    },
    clearTagsFilter: (state) => {
      state.tagsFilter = [];
    }
  },
})

// Action creators are generated for each case reducer function
export const {
  setSorting,
  addBrandsFilter,
  addTagsFilter,
  setTypeFilter,
  removeBrandsFilter,
  removeTagsFilter,
  addProduct,
  setItems,
  setCompanies,
  setActivePage,
  setFilteredItems,
  increaseItemQuantity,
  decreaseItemQuantity,
  removeProduct,
  clearBrandsFilter,
  clearTagsFilter
} = listingSlice.actions

export default listingSlice.reducer