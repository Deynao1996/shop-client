import {Routes, Route} from "react-router-dom";
import {DataProvider} from '../../contexts/DataContext.js';

import Cart from '../cart/Cart.js';
import Product from '../product/Product.js';

import MainPage from '../pages/mainPage/MainPage.js';
import RegisterPage from '../pages/registerPage/RegisterPage.js';
import SigninPage from '../pages/signinPage/SigninPage.js';
import {ProductsPageLayout, ProductsPageContent} from '../pages/productsPage/ProductsPage.js';
import ErrorPage from '../pages/errorPage/ErrorPage.js';

const  App = () => {
  return (
    <DataProvider>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/products" element={<ProductsPageLayout />}>
          <Route path="all" element={<ProductsPageContent />} />
          <Route path="summer" element={<ProductsPageContent category="summer sale"/>} />
          <Route path="autumn" element={<ProductsPageContent category="autum collection"/>} />
          <Route path="loungewear" element={<ProductsPageContent category="loungewear lowe"/>} />
          <Route path="cart" element={<Cart />} />
          <Route path=":id" element={<Product />} />
        </Route>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </DataProvider>
  )
};

export default App;
