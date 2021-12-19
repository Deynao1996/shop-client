import {Routes, Route} from "react-router-dom";

import MainPage from '../pages/mainPage/MainPage.js';
import CartPage from '../pages/cartPage/CartPage.js';
import RegisterPage from '../pages/registerPage/RegisterPage.js';
import SigninPage from '../pages/signinPage/SigninPage.js';
import ProductsListPage from '../pages/productsListPage/ProductsListPage.js';
import ProductPage from '../pages/productPage/ProductPage.js';
import ErrorPage from '../pages/errorPage/ErrorPage.js';

const  App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/products/summer" element={<ProductsListPage category="summer sale"/>} />
      <Route path="/products/autumn" element={<ProductsListPage category="autum collection"/>} />
      <Route path="/products/loungewear" element={<ProductsListPage category="loungewear lowe"/>} />
      <Route path="/products/:id" element={<ProductPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/signin" element={<SigninPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
