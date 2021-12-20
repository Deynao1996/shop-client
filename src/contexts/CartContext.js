import React, {useContext} from 'react';

const CartContext = React.createContext();

export const useCart = () => {
  return useContext(CartContext);
}

export const CartProvider = ({children}) => {
  const value = {
    test: '1'
  }


  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
