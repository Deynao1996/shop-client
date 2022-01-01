import {useState} from 'react';
import {Outlet} from 'react-router-dom';

import {Header} from '../../header/Header.js';
import Footer from '../../footer/Footer.js';
import Products from '../../products/Products.js';
import Sort from '../../sort/Sort.js';

const ProductsPageContent = ({category}) => {
  const [currentFilter, setCurrentFilter] = useState({
    size: 'all',
    price: 'newest'
  });

  return (
    <>
      <Sort
        category={category}
        setCurrentFilter={setCurrentFilter}/>
      <Products
        category={category}
        currentFilter={currentFilter}/>
    </>
  )
};

const ProductListLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
};

export {ProductListLayout, ProductsPageContent}
