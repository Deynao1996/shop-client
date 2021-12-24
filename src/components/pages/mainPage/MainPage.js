import {Link} from 'react-router-dom';

import {HeaderBanner, HeaderPromo} from '../../header/Header.js';
import Carousel from '../../carousel/Carousel.js';
import Category from '../../category/Category.js';
import Products from '../../products/Products.js';
import Newseller from '../../newseller/Newseller.js';
import Footer from '../../footer/Footer.js';

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
        titleContent={<h4>Recently Added</h4>}
        buttonContent={<Link to="/products/all">SEE ALL PRODUCTS</Link>}/>
      <Newseller />
      <Footer />
    </>
  )
};

export default MainPage;
