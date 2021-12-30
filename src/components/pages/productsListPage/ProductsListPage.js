import {useState} from 'react';

import {HeaderBanner, HeaderPromo} from '../../header/Header.js';
import Footer from '../../footer/Footer.js';
import Products from '../../products/Products.js';
import Sort from '../../sort/Sort.js';

const ProductsListPage = ({category}) => {
  const [currentFilter, setCurrentFilter] = useState({
    size: 'all',
    price: 'newest'
  });


  return (
    <>
      <header className="header">
        <HeaderPromo />
        <HeaderBanner />
      </header>
      <Sort
        category={category}
        setCurrentFilter={setCurrentFilter}/>
      <Products
        category={category}
        currentFilter={currentFilter}/>
      <Footer />
    </>
  )
}

export default ProductsListPage;
