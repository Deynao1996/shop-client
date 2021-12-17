import {Link} from 'react-router-dom';

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
          <Link to="/" className="header__promo_link">LAMA</Link>
          <div className="header__promo_act">
              <Link to="/register" className="header__promo_act-reg">Register</Link>
              <Link to="/signin" className="header__promo_act-signin">Sign in</Link>
              <Link to="/cart" className="header__promo_act-cart">
                <HiShoppingCart size="1.2em"/>
                <div>4</div>
              </Link>
          </div>
      </div>
    </>
  )
};

export {HeaderBanner, HeaderPromo};
