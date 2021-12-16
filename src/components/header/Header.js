import {FaSearch} from 'react-icons/fa';
import {HiShoppingCart} from "react-icons/hi";

import './_header.scss';

const HeaderBanner = () => {
  return <div className="header__banner">Super Deal! Free Shipping on Orders Over $50</div>
};

const HeaderPromo = () => {
  return (
    <>
      <div className="header__promo">
          <div className="header__promo_search">
            <span>EN</span>
            <label htmlFor="searchinput">
              <FaSearch/>
            </label>
            <input type="text" id="searchinput" placeholder="Search"/>
          </div>
          <a href="#" className="header__promo_link">LAMA</a>
          <div className="header__promo_act">
              <a href="#" className="header__promo_act-reg">Register</a>
              <a href="#" className="header__promo_act-signin">Sign in</a>
              <a href="#" className="header__promo_act-cart">
                <HiShoppingCart size="1.2em"/>
                <div>4</div>
              </a>
          </div>
      </div>
    </>
  )
};

export {HeaderBanner, HeaderPromo};
