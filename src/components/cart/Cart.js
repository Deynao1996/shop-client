import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import {useCart} from '../../contexts/CartContext.js';

import {ImCross} from "react-icons/im";
import './_cart.scss'

const CartWishList = () => {
  return (
    <div className="cart__items">
        <div className="cart__item">
            <div className="cart__item-img"><img src="https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1614188818-TD1MTHU_SHOE_ANGLE_GLOBAL_MENS_TREE_DASHERS_THUNDER_b01b1013-cd8d-48e7-bed9-52db26515dc4.png?crop=1xw:1.00xh;center,top&resize=480%3A%2A" alt="product"/></div>
            <div className="cart__item-content">
                <div className="cart__item-name">Product: <span>JESSIE THUNDER SHOES</span></div>
                <div className="cart__item-id">ID: <span>93813718293</span></div>
                <div className="cart__item-circle"></div>
                <div className="cart__item-size">Size: <span>37.5</span></div>
            </div>
            <div className="cart__item-features">
                <button className="cart__item_add">ADD TO CART</button>
                <div className="cart__item-price">$ 30</div>
            </div>
        </div>
        <hr/>
        <div className="cart__item">
            <div className="cart__item-img"><img src="https://i.pinimg.com/originals/2d/af/f8/2daff8e0823e51dd752704a47d5b795c.png" alt="product"/></div>
            <div className="cart__item-content">
                <div className="cart__item-name">Product: <span>HAKURA T-SHIRT</span></div>
                <div className="cart__item-id">ID: <span>93813718293</span></div>
                <div className="cart__item-circle"></div>
                <div className="cart__item-size">Size: <span>M</span></div>
            </div>
            <div className="cart__item-features">
                <button className="cart__item_add">ADD TO CART</button>
                <div className="cart__item-price">$ 20</div>
            </div>
        </div>
        <hr/>
        <div className="cart__item">
            <div className="cart__item-img"><img src="https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1614188818-TD1MTHU_SHOE_ANGLE_GLOBAL_MENS_TREE_DASHERS_THUNDER_b01b1013-cd8d-48e7-bed9-52db26515dc4.png?crop=1xw:1.00xh;center,top&resize=480%3A%2A" alt="product"/></div>
            <div className="cart__item-content">
                <div className="cart__item-name">Product: <span>JESSIE THUNDER SHOES</span></div>
                <div className="cart__item-id">ID: <span>93813718293</span></div>
                <div className="cart__item-circle"></div>
                <div className="cart__item-size">Size: <span>37.5</span></div>
            </div>
            <div className="cart__item-features">
                <button className="cart__item_add">ADD TO CART</button>
                <div className="cart__item-price">$ 30</div>
            </div>
        </div>
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
    return arr.map(({currentId, currentSrc, currentTitle, currentColor, currentSize, currentPrice, currentSum}, i) => {
      let totalItemPrice = currentPrice * +currentSum;

      return (
        <React.Fragment key={currentId}>
          <div
            className="cart__item"
            key={currentId}>
              <div className="cart__item-img"><img src={currentSrc} alt={currentTitle}/></div>
              <div className="cart__item-content">
                  <div className="cart__item-name">Product: <span>{currentTitle}</span></div>
                  <div className="cart__item-id">ID: <span>{currentId}</span></div>
                  <div className="cart__item-circle" style={{backgroundColor: `${currentColor}`}}></div>
                  <div className="cart__item-size">Size: <span>{currentSize}</span></div>
              </div>
              <div className="cart__item-features">
                  <div className="cart__item-calc">
                      <span onClick={() => onChangeCurrentSum(currentId, currentSum, +1)}>&#43;</span>
                      <div>{currentSum}</div>
                      <span onClick={() => onChangeCurrentSum(currentId, currentSum, -1)}>&#8722;</span>
                  </div>
                  <div className="cart__item-price">$ {totalItemPrice}</div>
              </div>
              <button
                className="cart__item-cross"
                onClick={() => deleteProductFromCart(currentId)}>
                  <ImCross />
              </button>
          </div>
          {i === arr.length - 1 ? null : <hr />}
        </React.Fragment>
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
  const {sum} = useCart();

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
                      Your Wishlist (3)
                  </span>
                </div>
                <button className="cart__nav-checkout">CHECKOUT NOW</button>
            </div>

            <div className="cart__wrapper">
              {view === 'bag' ? <CartOrderList /> : <CartWishList />}
            </div>
    </section>
  )
};

export default Cart;
