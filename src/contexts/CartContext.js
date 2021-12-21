import React, {useContext, useState} from 'react';

const CartContext = React.createContext();

export const useCart = () => {
  return useContext(CartContext);
}

export const CartProvider = ({children}) => {
  const [cartItems, setCartItems] = useState([]);
  let sum = 0;

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
    sum
  }


  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
