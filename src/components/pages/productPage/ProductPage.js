import {HeaderBanner, HeaderPromo} from '../../header/Header.js';
import Product from '../../product/Product.js';

const ProductPage = () => {
  return (
    <>
      <header className="header">
        <HeaderPromo />
        <HeaderBanner />
      </header>
      <Product />
    </>
  )
};

export default ProductPage;
