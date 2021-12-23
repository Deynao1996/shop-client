import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import {useCart} from '../../contexts/CartContext.js';
import {onSendItem} from '../products/Products.js';

import {ImCross} from "react-icons/im";
import './_cart.scss';

const CartWishList = () => {
  const {wishItems, setWishItems, cartItems, setCartItems, addExistedProductToCart, setLickedProductsId} = useCart();

  const deleteWishItem = (id) => {
    setWishItems(wishItems => wishItems.filter(item => item.currentId !== id));
    setLickedProductsId(lickedProductsId => lickedProductsId.filter(item => item !== id));
  };

  function renderWishItemsList(arr) {
    if (arr.length === 0) {
      return <h5>Your wishlist is empty now</h5>
    }

    return arr.map((props, i) => {
      return (
        <View
          key={props.currentId}
          i={i}
          items={arr}
          {...props}>
            <div className="cart__item-features">
                <button
                  className="cart__item_add"
                  onClick={() => onSendItem(props.currentId, props.currentSrc, props.currentPrice, props.currentSize, props.currentTitle, props.currentColor, cartItems, setCartItems, addExistedProductToCart)}>
                    ADD TO CART
                </button>
                <div className="cart__item-price">$ {props.currentPrice}</div>
            </div>
            <button
              className="cart__item-cross"
              onClick={() => deleteWishItem(props.currentId)}>
                <ImCross />
            </button>
        </View>
      )
    })
  }

  const wishItemsList = renderWishItemsList(wishItems);

  return (
    <div className="cart__items">
        {wishItemsList}
    </div>
  )
};

const CartOrderList = () => {
  const {cartItems, setCartItems} = useCart();

  const deleteProductFromCart = (id) => {
    setCartItems(cartItems => cartItems.filter(item => item.currentId !== id));
  };

  const onChangeCurrentSum = (id, currentSum, n) => {
    const value = currentSum + n;
    if (value < 1 || value > 999) {
      return;
    }
    setCartItems(cartItems => {
      return cartItems.map(item => {

        if (item.currentId === id) {
          return {...item, currentSum: value}
        } else {
          return item;
        }
      })
    });
  }

  function renderCartProductsList(arr) {
    if (arr.length === 0) {
      return <h5>Your cart is empty now</h5>
    }
    return arr.map((props, i) => {
      let totalItemPrice = props.currentPrice * +props.currentSum;

      return (
        <View
          key={props.currentId}
          i={i}
          items={arr}
          {...props}>
          <div className="cart__item-features">
              <div className="cart__item-calc">
                  <span onClick={() => onChangeCurrentSum(props.currentId, props.currentSum, +1)}>&#43;</span>
                  <div>{props.currentSum}</div>
                  <span onClick={() => onChangeCurrentSum(props.currentId, props.currentSum, -1)}>&#8722;</span>
              </div>
              <div className="cart__item-price">$ {totalItemPrice}</div>
          </div>
          <button
            className="cart__item-cross"
            onClick={() => deleteProductFromCart(props.currentId)}>
              <ImCross />
          </button>
        </View>
      )
    })
  }

  function calcTotalPrice(arr) {
    let totalPrice = 0;

    arr.forEach(item => {
      totalPrice += +item.currentPrice * item.currentSum;
    });
    return totalPrice;
  }

  const cartProductsList = renderCartProductsList(cartItems);
  const totalPrice = calcTotalPrice(cartItems);


  return (
    <>
      <div className="cart__items">
          {cartProductsList}
      </div>
      <div className="cart__order">
          <div className="cart__order-title">ORDER SUMMARY</div>
          <div className="cart__order-content">
              <div>Subtotal</div>
              <span>$ {totalPrice}</span>
          </div>
          <div className="cart__order-content">
              <div>Estimated Shipping</div>
              <span>$ 5.90</span>
          </div>
          <div className="cart__order-content">
              <div>Shipping Discount</div>
              <span>$ -5.90</span>
          </div>
          <div className="cart__order-total">
              <div>Total</div>
              <span>$ {totalPrice}</span>
          </div>
          <button className="cart__order-checkout">CHECKOUT NOW</button>
      </div>
    </>
  )
};

const Cart = () => {
  const [view, setView] = useState('bag');
  const {sum, wishItems} = useCart();

  return (
    <section className="cart">
        <div className="cart__title">YOUR BAG</div>
            <div className="cart__nav">
                <Link to="/products/summer" className="cart__nav-cont">CONTINUE SHOPPING</Link>
                <div className="cart__nav-links">
                  <span
                    style={{textDecoration: view === 'bag' ? 'none' : 'underline'}}
                    onClick={() => setView('bag')}>
                      Shopping Bag({sum ? sum : 0})
                  </span>
                  <span
                    style={{textDecoration: view === 'bag' ? 'underline' : 'none'}}
                    onClick={() => setView('wishlist')}>
                      Your Wishlist ({wishItems.length})
                  </span>
                </div>
                <button className="cart__nav-checkout">CHECKOUT NOW</button>
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

const View = ({children, i, items, ...props}) => {
  return (
    <>
      <div
        className="cart__item"
        key={props.currentId}>
          <div className="cart__item-img"><img src={props.currentSrc} alt={props.currentTitle}/></div>
          <div className="cart__item-content">
              <div className="cart__item-name">Product: <span>{props.currentTitle}</span></div>
              <div className="cart__item-id">ID: <span>{props.currentId}</span></div>
              <div className="cart__item-circle"></div>
              <div className="cart__item-size">Size: <span>{props.currentSize}</span></div>
          </div>
            {children}
      </div>
      {i === items.length - 1 ? null : <hr />}
    </>
  )
}

export default Cart;
