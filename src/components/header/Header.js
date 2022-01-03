import {useRef, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useProvider} from '../../contexts/DataContext.js';
import {useFeatures} from '../../hooks/useFeatures.js';
import {useSpring, animated} from 'react-spring';

import {HiShoppingCart} from "react-icons/hi";
import {FaSearch} from 'react-icons/fa';
import './_header.scss';

const HeaderBanner = () => {
  return <div className="header__banner">Super Deal! Free Shipping on Orders Over $50</div>;
};


const HeaderPromo = () => {
  const prevSum = useRef(null);

  const {productsSum, currentUser, signOut} = useProvider();
  const {redirectTo} = useFeatures();

  function handleSubmit(e) {
    e.preventDefault();

    const value = e.target.products.value.toLowerCase();
    redirectTo('/products/all/?products=' + value, false);
    e.target.reset();
  };

  useEffect(() => {
    prevSum.current = productsSum;
  }, [productsSum])


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
              <Link to="/products/cart" className="header__promo_act-cart">
                <HiShoppingCart size="1.2em"/>
                  {productsSum ?
                    <AnimatedDiv
                      productsSum={productsSum}
                      prevSum={prevSum}>
                        {productsSum}
                    </AnimatedDiv> :
                    null}
              </Link>
          </div>
      </div>
    </>
  )
};


const Header = () => {
  return (
    <header className="header">
      <HeaderPromo />
      <HeaderBanner />
    </header>
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


const AnimatedDiv = ({children, productsSum, prevSum}) => {
  const styles = useSpring({
    to: [
      {opacity: 1, transform: 'scale(1.1)'},
      {opacity: 1, transform: 'scale(1)'}
    ],
    from: {opacity: 0},
    reset: true,
    config: {
      duration: 100
    }
  });

  return (
    <animated.div style={productsSum !== prevSum.current ? styles : null}>
      {children}
    </animated.div>
  )
};

export {HeaderBanner, HeaderPromo, Header};
