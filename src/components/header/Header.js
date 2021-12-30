import {Link} from 'react-router-dom';
import {useProvider} from '../../contexts/DataContext.js';
import {useFeatures} from '../../hooks/useFeatures.js';

import {HiShoppingCart} from "react-icons/hi";
import {FaSearch} from 'react-icons/fa';
import './_header.scss';

const HeaderBanner = () => {
  return <div className="header__banner">Super Deal! Free Shipping on Orders Over $50</div>;
};

const HeaderPromo = () => {
  const {productsSum, currentUser, signOut} = useProvider();
  const {redirectTo} = useFeatures();

  function handleSubmit(e) {
    e.preventDefault();

    const value = e.target.products.value.toLowerCase();
    redirectTo('/products/all/?products=' + value, false);
    e.target.reset();
  };


  return (
    <>
      <div className="header__promo">
          <form
            className="header__promo_search"
            onSubmit={handleSubmit}>
              <span>EN</span>
              <button type="submit"><FaSearch/></button>
              <input
                type="search"
                name="products"
                placeholder="Search"/>
          </form>
          <Link to="/" className="header__promo_link">SHOP</Link>
          <div className="header__promo_act">
              <View
                currentUser={currentUser}
                signOut={signOut}/>
              <Link to="/cart" className="header__promo_act-cart">
                <HiShoppingCart size="1.2em"/>
                  {productsSum ? <div>{productsSum}</div> : null}
              </Link>
          </div>
      </div>
    </>
  )
};


const View = ({currentUser, signOut}) => {
  if (currentUser) {
    return <span
      className="header__promo_act-out"
      onClick={() => signOut('/')}>Sign Out</span>
  }

  return (
    <>
      <Link to="/register" className="header__promo_act-reg">Register</Link>
      <Link to="/signin" className="header__promo_act-signin">Sign in</Link>
    </>
  )
};

export {HeaderBanner, HeaderPromo};
