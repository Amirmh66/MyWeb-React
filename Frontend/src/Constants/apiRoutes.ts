const baseURL = "http://localhost:3000";

const apiRoutes: any = {

panelAdmin:`${baseURL}/PanelAdmin`,

  // Products
  getProducts: `${baseURL}/products`,
  getProductById: (id: string) => `${baseURL}/products/${id}`,
  createProduct: `${baseURL}/products/`,
  updateProduct: (id: string) => `${baseURL}/products/${id}`,
  deleteProduct: (id: string) => `${baseURL}/products/${id}`,
  deleteAllProducts: `${baseURL}/products`,
  // Users
  getUsers: `${baseURL}/users`,
  getUserById: (id: string) => `${baseURL}/users/${id}`,
  createUser: `${baseURL}/users/`,
  updateUser: (id: string) => `${baseURL}/users/${id}`,
  deleteUser: (id: string) => `${baseURL}/users/${id}`,
  deleteAllUsers: `${baseURL}/users`,
  // Categories
  getCategories: `${baseURL}/categories`,
  getCategoryById: (id: string) => `${baseURL}/categories/${id}`,
  createCategory: `${baseURL}/categories/`,
  updateCategory: (id: string) => `${baseURL}/categories/${id}`,
  deleteCategory: (id: string) => `${baseURL}/categories/${id}`,
  deleteAllCategories: `${baseURL}/categories`,

  // Roles
  getRoles: `${baseURL}/roles`,
  getRoleById: (id: string) => `${baseURL}/roles/${id}`,
  createRole: `${baseURL}/roles/`,
  updateRole: (id: string) => `${baseURL}/roles/${id}`,
  deleteRole: (id: string) => `${baseURL}/roles/${id}`,
  deleteAllRoles: `${baseURL}/roles`,

  // Authentication
  Login: `${baseURL}/login`,
  SignUp: `${baseURL}/signUp`,
};

export default apiRoutes;
