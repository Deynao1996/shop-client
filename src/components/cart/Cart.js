import {useState} from 'react';
import {Link} from 'react-router-dom';

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
  return (
    <>
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
                  <div className="cart__item-calc">
                      <span>&#43;</span>
                      <div>2</div>
                      <span>&#8722;</span>
                  </div>
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
                  <div className="cart__item-calc">
                      <span>&#43;</span>
                      <div>1</div>
                      <span>&#8722;</span>
                  </div>
                  <div className="cart__item-price">$ 20</div>
              </div>
          </div>
      </div>
      <div className="cart__order">
          <div className="cart__order-title">ORDER SUMMARY</div>
          <div className="cart__order-content">
              <div>Subtotal</div>
              <span>$ 80</span>
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
              <span>$ 80</span>
          </div>
          <button className="cart__order-checkout">CHECKOUT NOW</button>
      </div>
    </>
  )
};

const Cart = () => {
  const [view, setView] = useState('bag');

  return (
    <section className="cart">
        <div className="cart__title">YOUR BAG</div>
            <div className="cart__nav">
                <Link to="/products" className="cart__nav-cont">CONTINUE SHOPPING</Link>
                <div className="cart__nav-links">
                  <span
                    style={{textDecoration: view === 'bag' ? 'none' : 'underline'}}
                    onClick={() => setView('bag')}>
                      Shopping Bag(2)
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
