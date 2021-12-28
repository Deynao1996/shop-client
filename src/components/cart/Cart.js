import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import {ToastContainer} from 'react-toastify';

import {useCart} from '../../contexts/CartContext.js';
import useHttp from '../../hooks/http.hook.js';
import {onSendItem} from '../products/Products.js';
import {showStatusModal} from '../pages/registerPage/RegisterPage';

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
  const navigate = useNavigate();
  const {cartItems, setCartItems, currentUser} = useCart();
  const {request} = useHttp();

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

  function redirectToSignIn() {
    navigate('/signin', {state: '/cart'})
  }

  function calcTotalPrice(arr) {
    let totalPrice = 0;

    arr.forEach(item => {
      totalPrice += +item.currentPrice * item.currentSum;
    });
    return totalPrice;
  }

  async function handleToken(token, addresses) {
    const {email, id, created, card:{address_city, address_country, address_line1, name}} = token;
    const currentDate = new Date(created * 1000).toString();

    const orderedProducts = [];
    cartItems.forEach(item => {
      orderedProducts.push(item.currentId + 'X' + item.currentSum);
    });

    const order = {
      id,
      email,
      name,
      address_city,
      address_country,
      address_line1,
      currentDate,
      orderedProducts: orderedProducts.toString()
    }

    try {
      await request(
        'http://localhost:3001/orders',
        'POST',
        JSON.stringify(order));

      showStatusModal('success', 'Your payment passed. The operator will contact you');
      setCartItems(cartItems => []);
    } catch (e) {
      showStatusModal('error', 'Something went wrong. Please try later');
    }
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
          <ToastContainer />
          {currentUser ?
            <StripeCheckout
              stripeKey="pk_test_51KAXsmEFNiWrQ3FhzZENwP3HLjjIZebNTP17IpoczCXZcK6GCmmB3GUnuGvOkZOjDJ4Ea9xUPnMz4d0OLRoA1nBK00ZLWBVvRi"
              image="https://toppng.com/uploads/preview/aid-icon-png-download-make-a-payment-ico-11563043629ug20hj7hbv.png"
              token={handleToken}
              billingAddress
              shippingAddress
              amount={totalPrice * 100}
              email={currentUser?.email || ''}>
                <button
                  className="cart__order-checkout"
                  disabled={!totalPrice}>CHECKOUT NOW</button>
            </StripeCheckout> :
            <button
              className="cart__order-checkout"
              onClick={redirectToSignIn}>
                SIGN IN
            </button>
          }
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
                <Link to="/products/all" className="cart__nav-cont">CONTINUE SHOPPING</Link>
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

const View = ({children, i, items, ...props}) => {
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
}

export default Cart;
