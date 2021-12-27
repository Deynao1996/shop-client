import {Link, useNavigate} from 'react-router-dom';
import {useCart} from '../../contexts/CartContext.js';

import {HiShoppingCart} from "react-icons/hi";
import {FaSearch} from 'react-icons/fa';

import './_header.scss';

const HeaderBanner = () => {
  return <div className="header__banner">Super Deal! Free Shipping on Orders Over $50</div>
};

const HeaderPromo = () => {

  const {sum, currentUser, signOut} = useCart();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const value = e.target.products.value.toLowerCase();
    navigate('/products/all/?products=' + value, {replace: true});
    e.target.reset();
  }

  function redirectToMainPage() {
    navigate('/', {replace: true})
  }

  return (
    <>
      <div className="header__promo">
          <form className="header__promo_search" onSubmit={handleSubmit}>
            <span>EN</span>
            <button type="submit"><FaSearch/></button>
            <input
              type="search"
              name="products"
              placeholder="Search"/>
          </form>
          <Link to="/" className="header__promo_link">LAMA</Link>
          <div className="header__promo_act">
              <View
                currentUser={currentUser}
                signOut={signOut}
                redirectToMainPage={redirectToMainPage}/>
              <Link to="/cart" className="header__promo_act-cart">
                <HiShoppingCart size="1.2em"/>
                  {sum ? <div>{sum}</div> : null}
              </Link>
          </div>
      </div>
    </>
  )
};

const View = ({currentUser, signOut, redirectToMainPage}) => {
  if (currentUser) {
    return <span
      className="header__promo_act-out"
      onClick={() => signOut(redirectToMainPage)}>Sign Out</span>
  }
  return (
    <>
      <Link to="/register" className="header__promo_act-reg">Register</Link>
      <Link to="/signin" className="header__promo_act-signin">Sign in</Link>
    </>
  )
}

export {HeaderBanner, HeaderPromo};
