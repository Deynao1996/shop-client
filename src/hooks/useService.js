import useHttp from './http.hook.js';

const useService = () => {
  const {request, itemLoadingStatus} = useHttp();
  const _apiBase = 'http://localhost:5000/api';

  const getAllProducts = async (category = "", offset) => {
    const products = await request(`${_apiBase}/product?category=${category}&offset=${offset}`);
    return products;
  };

  const getProductById = async (id) => {
    const product = await request(`${_apiBase}/product/${id}`);
    return product;
  };

  const userUpdate = async (userId, data) => {
    const response = await request(`${_apiBase}/user/update/${userId}`, 'PUT', data);
    return response;
  };

  const createNewUser = async (user) => {
    const newUser = await request(`${_apiBase}/auth/register`, 'POST', user);
    return newUser;
  };

  const signIn = async (user) => {
    const newUser = await request(`${_apiBase}/auth/login`, 'POST', user);
    return newUser;
  };

  const orderProduct = async (product) => {
    const newProduct = await request(`${_apiBase}/orders/send`, 'POST', product);
    return newProduct;
  };

  const stripeCheckout = async (stripeToken) => {
    const response = await request(`${_apiBase}/payment/checkout`, 'POST', stripeToken);
    return response;
  };


  return {
    getAllProducts,
    getProductById,
    userUpdate,
    createNewUser,
    signIn,
    orderProduct,
    stripeCheckout,
    itemLoadingStatus
  }
};

export default useService;
