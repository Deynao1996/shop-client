import {useFeatures} from '../../hooks/useFeatures';
import {useProvider} from '../../contexts/DataContext.js';

import {View} from '../cart/Cart.js';
import {ImCross} from "react-icons/im";

const CartWishList = () => {
  const {wishItems, setWishItems, cartItems, setCartItems, addExistingProductToCart, setLickedProductsId} = useProvider();
  const {onSendItem} = useFeatures();

  const deleteWishItem = (id) => {
    setWishItems(wishItems => wishItems.filter(item => item.currentId !== id));
    setLickedProductsId(lickedProductsId => lickedProductsId.filter(item => item !== id));
  };

  function renderWishItemsList(arr) {
    if (arr.length === 0) {
      return <h5>Your wishlist is empty now</h5>;
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
                  onClick={() => onSendItem(props.currentId, props.currentSrc, props.currentPrice, props.currentSize, props.currentTitle, props.currentColor, cartItems, setCartItems, addExistingProductToCart)}>
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
    });
  };

  const wishItemsList = renderWishItemsList(wishItems);


  return (
    <div className="cart__items">
        {wishItemsList}
    </div>
  )
};

export default CartWishList;
