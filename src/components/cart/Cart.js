import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {useProvider} from '../../contexts/DataContext.js';

import CartWishList from '../cartWishList/CartWishList';
import CartOrderList from '../cartOrderList/CartOrderList';

import './_cart.scss';

const Cart = () => {
  const [view, setView] = useState('bag');
  const {productsSum, wishItems} = useProvider();


  return (
    <section className="cart">
        <div className="cart__title">YOUR BAG</div>
            <div className="cart__nav">
                <Link to="/products/all" className="cart__nav-cont">CONTINUE SHOPPING</Link>
                <div className="cart__nav-links">
                  <span
                    style={{textDecoration: view === 'bag' ? 'none' : 'underline'}}
                    onClick={() => setView('bag')}>
                      Shopping Bag({productsSum ? productsSum : 0})
                  </span>
                  <span
                    style={{textDecoration: view === 'bag' ? 'underline' : 'none'}}
                    onClick={() => setView('wishlist')}>
                      Your Wishlist ({wishItems.length})
                  </span>
                </div>
                <Link to="/" className="cart__nav-checkout">HOME PAGE</Link>
            </div>

            <div className="cart__wrapper">
              {view === 'bag' ?
                <CartOrderList /> :
                <CartWishList />
              }
            </div>
    </section>
  )
};

export const View = ({children, i, items, ...props}) => {
  const numId = props.currentId.replace(/\D/g, "");


  return (
    <>
      <div
        className="cart__item"
        key={props.currentId}>
          <Link to={`/products/${numId}`} className="cart__item-img"><img src={props.currentSrc} alt={props.currentTitle}/></Link>
          <div className="cart__item-content">
              <div className="cart__item-name">Product: <span>{props.currentTitle}</span></div>
              <div className="cart__item-id">ID: <span>{props.currentId}</span></div>
              <div className="cart__item-circle" style={{backgroundColor: `${props.currentColor}`}}></div>
              <div className="cart__item-size">Size: <span>{props.currentSize}</span></div>
          </div>
            {children}
      </div>
      {i === items.length - 1 ? null : <hr />}
    </>
  )
};

export default Cart;
