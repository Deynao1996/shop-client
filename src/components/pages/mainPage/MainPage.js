import {HeaderBanner, HeaderPromo} from '../../header/Header.js';
import Slider from '../../slider/Slider.js';
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
      <Slider />
      <Category />
      <Products />
      <Newseller />
      <Footer />
    </>
  )
};

export default MainPage;
