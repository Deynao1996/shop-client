import {HeaderBanner, HeaderPromo} from '../../header/Header.js';
import Footer from '../../footer/Footer.js';
import Cart from '../../cart/Cart.js';

const CartPage = () => {
  return (
    <>
      <header className="header">
        <HeaderPromo />
        <HeaderBanner />
      </header>
      <Cart />
      <Footer />
    </>
  )
};

export default CartPage;
