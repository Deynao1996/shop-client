import {useNavigate} from 'react-router-dom';
import useService from '../../hooks/useService';
import {useFeatures} from '../../hooks/useFeatures';
import {useProvider} from '../../contexts/DataContext.js';
import StripeCheckout from 'react-stripe-checkout';
import {ToastContainer} from 'react-toastify';

import {View} from '../cart/Cart.js';
import {ImCross} from "react-icons/im";

const CartOrderList = () => {
  const navigate = useNavigate();

  const {cartItems, setCartItems, currentUser} = useProvider();
  const {orderProduct} = useService();
  const {showStatusModal} = useFeatures();

  const deleteProductFromCart = (id) => {
    setCartItems(cartItems => cartItems.filter(item => item.currentId !== id));
  };

  const onChangeCurrentSum = (id, currentSum, n) => {
    const value = currentSum + n;
    if (value < 1) {
      return;
    }
    setCartItems(cartItems => {
      return cartItems.map(item => {

        if (item.currentId === id) {
          return {...item, currentSum: value}
        } else {
          return item;
        }
      });
    });
  }

  function redirectToSignInWithState() {
    navigate('/signin', {state: '/cart'});
  };

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
    };

    try {
      await orderProduct(JSON.stringify(order));

      showStatusModal('Your payment passed. The operator will contact you', 'success');
      setCartItems(cartItems => []);
    } catch (e) {
      showStatusModal('Something went wrong. Please try later', 'error');
    }
  };

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
    });
  };

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
              onClick={redirectToSignInWithState}>
                SIGN IN
            </button>
          }
      </div>
    </>
  )
};

export default CartOrderList;
