import useHttp from './http.hook.js';

const useService = () => {
  const {request, itemLoadingStatus} = useHttp();
  const _apiBase = 'http://localhost:3001';

  const getAllProducts = async (categoty, offset) => {
    const products = await request(`${_apiBase}/products`);
    return _filterByCategory(products, categoty).slice(0, offset);
  };

  const getProductById = async (id) => {
    const products = await request(`${_apiBase}/products`);
    return _findProductById(products, id);
  };

  const putNewsellerEmail = async (userId, data) => {
    const response = await request(`${_apiBase}/users/${userId}`, 'PUT', data);
    return response;
  };

  const getAllUsers = async () => {
    const allUsers = await request(`${_apiBase}/users`);
    return allUsers;
  };

  const createNewUser = async (user) => {
    const newUser = await request(`${_apiBase}/users`, 'POST', user);
    return newUser;
  };

  const orderProduct = async (product) => {
    const newProduct = await request(`${_apiBase}/orders`, 'POST', product);
    return newProduct;
  };

  function _filterByCategory(arr, category) {
    return arr.filter(item => {
      if (!category) {
        return item;
      }
      return item.category === category;
    }).reverse();
  };

  function _findProductById(arr, id) {
    const product = arr.find(item => item.id === id);
    return product;
  };


  return {
    getAllProducts,
    getProductById,
    putNewsellerEmail,
    getAllUsers,
    createNewUser,
    orderProduct,
    itemLoadingStatus
  }
};

export default useService;
