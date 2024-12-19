const baseURL = "http://localhost:3000";

const apiRoutes: any = {
  // Products
  getProducts: `${baseURL}/products`,
  getProductById: (id: string) => `${baseURL}/products/${id}`,
  createProduct: `${baseURL}/products/`,
  updateProduct: (id: string) => `${baseURL}/products/${id}`,
  deleteProduct: (id: string) => `${baseURL}/products/${id}`,
  deleteAllProducts: `${baseURL}/products`,
  getProductCount: `${baseURL}/productsCount`,
  // Users
  getUsers: `${baseURL}/users`,
  getUserById: (id: string) => `${baseURL}/users/${id}`,
  createUser: `${baseURL}/users/`,
  updateUser: (id: string) => `${baseURL}/users/${id}`,
  deleteUser: (id: string) => `${baseURL}/users/${id}`,
  deleteAllUsers: `${baseURL}/users`,
  getUserCount: `${baseURL}/getUserCount`,
  // Categories
  getCategories: `${baseURL}/categories`,
  getCategoryById: (id: string) => `${baseURL}/categories/${id}`,
  createCategory: `${baseURL}/categories/`,
  getCategoryTypesById: (id: string) => `${baseURL}/categoryTypes/${id}`,
  updateCategory: (id: string) => `${baseURL}/categories/${id}`,
  deleteCategory: (id: string) => `${baseURL}/categories/${id}`,
  deleteAllCategories: `${baseURL}/categories`,
  // Types
  getTypes: `${baseURL}/types`,
  createType: `${baseURL}/types`,
  updateType: (id: string) => `${baseURL}/types/${id}`,
  getTypeById: (id: string) => `${baseURL}/types/${id}`,
  deleteTypeById: (id: string) => `${baseURL}/types/${id}`,
  // Roles
  getRoles: `${baseURL}/roles`,
  getRoleById: (id: string) => `${baseURL}/roles/${id}`,
  createRole: `${baseURL}/roles/`,
  updateRole: (id: string) => `${baseURL}/roles/${id}`,
  deleteRole: (id: string) => `${baseURL}/roles/${id}`,
  deleteAllRoles: `${baseURL}/roles`,
  // Brands
  getBrands: `${baseURL}/brands`,
  getBrandTypes: (id: string) => `${baseURL}/brandTypes/${id}`,
  getBrandById: (id: string) => `${baseURL}/brands/${id}`,
  createBrand: `${baseURL}/brands`,
  updateBrand: (id: string) => `${baseURL}/brands/${id}`,
  deleteBrand: (id: string) => `${baseURL}/brands/${id}`,
  // Authentication
  Login: `${baseURL}/login`,
  SignUp: `${baseURL}/signUp`,
};

export default apiRoutes;
