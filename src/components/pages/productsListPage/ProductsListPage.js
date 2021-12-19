import {HeaderBanner, HeaderPromo} from '../../header/Header.js';
import Footer from '../../footer/Footer.js';
import Products from '../../products/Products.js';
import Sort from '../../sort/Sort.js';

const ProductsListPage = ({category}) => {
  return (
    <>
      <header className="header">
        <HeaderPromo />
        <HeaderBanner />
      </header>
      <Sort
        category={category}/>
      <Products
        category={category}/>
      <Footer />
    </>
  )
};

export default ProductsListPage;
