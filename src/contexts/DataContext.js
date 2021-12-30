import React, {useContext, useState, useEffect} from 'react';
import {useFeatures} from '../hooks/useFeatures';

const DataContext = React.createContext();

export const useProvider = () => {
  return useContext(DataContext);
};

export const DataProvider = ({children}) => {
  const [cartItems, setCartItems] = useState([]);
  const [wishItems, setWishItems] = useState([]);
  const [lickedProductsId, setLickedProductsId] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const {redirectTo} = useFeatures();

  let productsSum = 0;

  const addExistingProductToCart = (items, id, n) => {
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
  };

  const login = (obj, url) => {
    setCurrentUser(obj);
    localStorage.setItem('user', JSON.stringify(obj));

    if (url) {
      redirectTo(url, true);
    }
  };

  const signOut = (url) => {
    setCurrentUser(null);
    localStorage.removeItem('user');

    if (url) {
      redirectTo(url, true);
    }
  };

  function renderSumCartItems() {
    if (cartItems.length === 0) {
      return;
    }

    cartItems.forEach(({currentSum}) => {
      productsSum += currentSum;
    });

    if (productsSum > 999) {
      productsSum = 999
    }
  }
  renderSumCartItems();

  const value = {
    cartItems,
    setCartItems,
    addExistingProductToCart,
    productsSum,
    wishItems,
    setWishItems,
    lickedProductsId,
    setLickedProductsId,
    currentUser,
    setCurrentUser,
    login,
    signOut
  }

  useEffect(() => {
    if (localStorage.getItem('user')) {
      login(JSON.parse(localStorage.getItem('user')));
    }
    // eslint-disable-next-line
  }, []);


  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  )
}
