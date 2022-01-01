import {Link} from 'react-router-dom';

import {HeaderPromo, HeaderBanner} from '../../header/Header.js';
import Carousel from '../../carousel/Carousel.js';
import Category from '../../category/Category.js';
import Products from '../../products/Products.js';
import Newseller from '../../newseller/Newseller.js';
import Footer from '../../footer/Footer.js';

const content = {
  title: () => (
    <h4>Recently Added</h4>
  ),
  button: () => (
    <Link to="/products/all" className="products__redirect">SEE ALL PRODUCTS</Link>
  )
};

const MainPage = () => {
  return (
    <>
      <header className="header">
        <HeaderBanner />
        <HeaderPromo />
      </header>
      <Carousel />
      <Category />
      <Products
        offset={10}
        content={content}/>
      <Newseller />
      <Footer />
    </>
  )
};

export default MainPage;
