import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';

import useHttp from '../../hooks/http.hook.js';
import {useCart} from '../../contexts/CartContext.js';
import Spinner from '../spinner/Spinner.js';

import {FaSearch} from 'react-icons/fa';
import {HiShoppingCart} from "react-icons/hi";
import {AiFillHeart} from "react-icons/ai";

import './_products.scss';

const Products = ({category, currentFilter}) => {

  const {setCartItems, cartItems} = useCart();

  const [products, setProducts] = useState([]);
  const {request, itemLoadingStatus} = useHttp();

  function filterBySortPanel(arr, currentFilter) {
    if (!currentFilter) {
      return arr;
    }

    const filtredArray = arr.filter(item => {
      if (currentFilter.size === 'all') {
        return arr;
      }
      return item.size === currentFilter.size;
    });

    return filtredArray.sort((a, b) => {
      if (currentFilter.price === 'desc') {
        return a.price - b.price;
      }
      if (currentFilter.price === 'asc') {
        return b.price - a.price;
      }
      return 0;
    })
  }

  function filterByCategory(arr, filterName) {
    return arr.filter(item => {
      if (!filterName) {
        return arr;
      }
      return item.category === filterName;
    })
  }

  function addExistedProductToCart(targetId, products, n) {
    setCartItems(cartItems => {
      return products.map(item => {
        if (item.currentId === targetId) {
          return {...item, currentSum: item.currentSum + n}
        } else {
          return item;
        }
      });
    });
  }

  function addProductToCart(id, src, price, size, title, optionColors) {
    const product = {
      currentId: id,
      currentSize: size,
      currentColor: optionColors[0] || null,
      currentSum: 1,
      currentSrc: src,
      currentPrice: price,
      currentTitle: title
    }

    const findItem = cartItems.find(item => item.currentId === id);
    if (findItem) {
      addExistedProductToCart(id, cartItems, 1);
      return;
    }

    setCartItems(cartItems => ([...cartItems, product]));
  }


  function renderProductsList(arr) {
      if (arr.length === 0) {
          return <h5 className="products__status">There are no products now</h5>
      }

      return arr.map(({id, src, price, size, title, optionColors}) => {

        const optionsId = id + size + optionColors[0];

          return (
            <div
              className="products__item"
              key={optionsId}>
                <div className="products__item_inner">
                    <div className="products__item_inner-circle">
                          <img src={src} alt="product"/>
                    </div>
                </div>
                <div className="products__item_outer">
                    <div className="products__item_outer-links">
                        <Link to={`/products/${id}`}>
                          <FaSearch />
                        </Link>
                        <button
                          onClick={() => addProductToCart(optionsId, src, price, size, title, optionColors)}>
                            <HiShoppingCart />
                        </button>
                        <button><AiFillHeart /></button>
                    </div>
                </div>
            </div>
          )
      })
  }

  function getAllFiltredProducts(arr) {
    return renderProductsList(filterByCategory(filterBySortPanel(products, currentFilter), category));
  }

  useEffect(() => {
    request('http://localhost:3001/products')
      .then(res => setProducts(res.reverse()));
      // eslint-disable-next-line
  }, []);

  if (itemLoadingStatus === "loading") {
      return <Spinner/>;
  } else if (itemLoadingStatus === "error") {
      return <h5 className="products__status">Loading error</h5>
  }

  const elements = getAllFiltredProducts(products);


  return (
    <section className="products">
      <div className="products__items">
        {elements}
      </div>
    </section>
  )
};

export default Products;
