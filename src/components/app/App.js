import {Routes, Route} from "react-router-dom";
import {DataProvider} from '../../contexts/DataContext.js';

import MainPage from '../pages/mainPage/MainPage.js';
import CartPage from '../pages/cartPage/CartPage.js';
import RegisterPage from '../pages/registerPage/RegisterPage.js';
import SigninPage from '../pages/signinPage/SigninPage.js';
import {ProductListLayout, ProductsPageContent} from '../pages/productsListPage/ProductsListPage.js';
import ProductPage from '../pages/productPage/ProductPage.js';
import ErrorPage from '../pages/errorPage/ErrorPage.js';

const  App = () => {
  return (
    <DataProvider>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/products" element={<ProductListLayout />}>
          <Route path="all" element={<ProductsPageContent />} />
          <Route path="summer" element={<ProductsPageContent category="summer sale"/>} />
          <Route path="autumn" element={<ProductsPageContent category="autum collection"/>} />
          <Route path="loungewear" element={<ProductsPageContent category="loungewear lowe"/>} />
        </Route>
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </DataProvider>
  )
};

export default App;
