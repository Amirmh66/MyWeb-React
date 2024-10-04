const baseURL = "http://localhost:3000";

const apiRoutes: any = {
  getProducts: `${baseURL}/products`,
  getProductById: (id: string) => `${baseURL}/products/${id}`,
  createProduct: `${baseURL}/products/`,
  updateProduct: (id: string) => `${baseURL}/products/${id}`,
  deleteProduct: (id: string) => `${baseURL}/products/${id}`,

  getUsers: `${baseURL}/users`,
  getUserById: (id: string) => `${baseURL}/users/${id}`,
  createUser: `${baseURL}/users/`,
  updateUser: (id: string) => `${baseURL}/users/${id}`,
  deleteUser: (id: string) => `${baseURL}/users/${id}`,

  getCategories:`${baseURL}/categories`,
  getCategoryById: (id: string) => `${baseURL}/categories/${id}`,
  createCategory: `${baseURL}/categories/`,
  updateCategory: (id: string) => `${baseURL}/categories/${id}`,
  deleteCategory: (id: string) => `${baseURL}/categories/${id}`,
  
};

export default apiRoutes;
