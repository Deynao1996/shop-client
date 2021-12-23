import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';

import useHttp from '../../hooks/http.hook.js';
import {useCart} from '../../contexts/CartContext.js';
import Spinner from '../spinner/Spinner.js';

import {FaSearch} from 'react-icons/fa';
import {HiShoppingCart} from "react-icons/hi";
import {AiFillHeart} from "react-icons/ai";

import './_products.scss';

export function onSendItem(id, src, price, size, title, optionColors, items, setItems, func) {
  const product = {
    currentId: id,
    currentSize: size,
    currentColor: optionColors[0] || null,
    currentSum: 1,
    currentSrc: src,
    currentPrice: price,
    currentTitle: title
  }

  if (func) {
    const isProductExist = func(items, id, 1);
    if (isProductExist) {
      return;
    }
  }

  setItems(items => ([...items, product]));
}

const Products = ({category, currentFilter}) => {

  const [products, setProducts] = useState([]);

  const {setCartItems, cartItems, addExistedProductToCart, setWishItems, wishItems, lickedProductsId, setLickedProductsId} = useCart();
  const {request, itemLoadingStatus} = useHttp();

  const onLikeProduct = (id) => {
    setLickedProductsId(lickedProductsId => [...lickedProductsId, id]);
  }

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

  function renderProductsList(arr) {
      if (arr.length === 0) {
          return <h5 className="products__status">There are no products now</h5>
      }

      return arr.map(({id, src, price, size, title, optionColors}) => {

        const optionsId = id + size + optionColors[0];
        const isProductLike = lickedProductsId.find(lickedId => lickedId === optionsId);

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
                          onClick={() => onSendItem(optionsId, src, price, size, title, optionColors, cartItems, setCartItems, addExistedProductToCart)}>
                            <HiShoppingCart />
                        </button>
                        <button
                          onClick={() => {
                            onSendItem(optionsId, src, price, size, title, optionColors, wishItems, setWishItems);
                            onLikeProduct(optionsId);
                          }}
                          className={isProductLike ? 'disabled' : ""}
                          disabled={isProductLike}>
                          {
                            isProductLike ?
                              <AiFillHeart style={{fill: 'red'}}/> :
                              <AiFillHeart />
                          }
                        </button>
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
