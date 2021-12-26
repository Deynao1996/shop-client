import React, {useContext, useState} from 'react';

const CartContext = React.createContext();

export const useCart = () => {
  return useContext(CartContext);
}

export const CartProvider = ({children}) => {
  const [cartItems, setCartItems] = useState([]);
  const [wishItems, setWishItems] = useState([]);
  const [lickedProductsId, setLickedProductsId] = useState([]);
  const [user, setUser] = useState(null);
  let sum = 0;

  const addExistedProductToCart = (items, id, n) => {
    const findItem = items.find(item => item.currentId === id);
    if (findItem) {
      setCartItems(cartItems => {
        return items.map(item => {
          if (item.currentId === id) {
            return {...item, currentSum: item.currentSum + n}
          } else {
            return item;
          }
        });
      });
      return findItem;
    }
    return findItem;
  }

  function renderSumCartItems() {
    if (cartItems.length === 0) {
      return
    }

    cartItems.forEach(({currentSum}) => {
      sum += currentSum;
    });

    if (sum > 999) {
      sum = 999
    }
  }
  renderSumCartItems();

  const value = {
    cartItems,
    setCartItems,
    addExistedProductToCart,
    sum,
    wishItems,
    setWishItems,
    lickedProductsId,
    setLickedProductsId,
    setUser
  }


  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
