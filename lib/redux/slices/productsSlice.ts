import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating?: { rate: number; count: number }
}

interface ProductsState {
  items: Product[]
  filteredItems: Product[]
  categories: string[]
  loading: boolean
  error: string | null
  searchTerm: string
  selectedCategory: string
  cache: { [key: string]: Product[] }
}

const initialState: ProductsState = {
  items: [],
  filteredItems: [],
  categories: [],
  loading: false,
  error: null,
  searchTerm: "",
  selectedCategory: "",
  cache: {},
}

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload
      state.filteredItems = action.payload
      state.cache["all_products"] = action.payload
    },
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload
      applyFilters(state)
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload
      applyFilters(state)
    },
    cacheProduct: (state, action: PayloadAction<{ key: string; product: Product }>) => {
      state.cache[action.payload.key] = [action.payload.product]
    },
  },
})

function applyFilters(state: ProductsState) {
  let filtered = state.items
  if (state.selectedCategory) {
    filtered = filtered.filter((p) => p.category === state.selectedCategory)
  }
  if (state.searchTerm) {
    filtered = filtered.filter((p) => p.title.toLowerCase().includes(state.searchTerm.toLowerCase()))
  }
  state.filteredItems = filtered
}

export const { setProducts, setCategories, setLoading, setError, setSearchTerm, setSelectedCategory, cacheProduct } =
  productsSlice.actions
export default productsSlice.reducer
