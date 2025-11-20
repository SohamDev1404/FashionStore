import axios from "axios"

const API_BASE_URL = "https://fakestoreapi.com"

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
})

export interface ApiResponse<T> {
  data: T
  status: number
}

export const fetchProducts = async (): Promise<any[]> => {
  const response = await apiClient.get("/products")
  return response.data
}

export const fetchProductById = async (id: number): Promise<any> => {
  const response = await apiClient.get(`/products/${id}`)
  return response.data
}

export const fetchCategories = async (): Promise<string[]> => {
  const response = await apiClient.get("/products/categories")
  return response.data
}

export const fetchProductsByCategory = async (category: string): Promise<any[]> => {
  const response = await apiClient.get(`/products/category/${category}`)
  return response.data
}
