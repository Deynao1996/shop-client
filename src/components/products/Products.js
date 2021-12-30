import {Link, useSearchParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import useService from '../../hooks/useService';
import {useProvider} from '../../contexts/DataContext.js';
import {useFeatures} from '../../hooks/useFeatures';
import Spinner from '../spinner/Spinner.js';

import {FaSearch} from 'react-icons/fa';
import {HiShoppingCart} from "react-icons/hi";
import {AiFillHeart} from "react-icons/ai";

import './_products.scss';

const Products = ({category, currentFilter, offset, content}) => {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();

  const {setCartItems, cartItems, addExistingProductToCart, setWishItems, wishItems, lickedProductsId, setLickedProductsId} = useProvider();
  const {getAllProducts, itemLoadingStatus} = useService();
  const {onSendItem} = useFeatures();

  const _onLikeProduct = (id) => {
    setLickedProductsId(lickedProductsId => [...lickedProductsId, id]);
  };

  const _deleteWishItem = (id) => {
    setWishItems(wishItems => wishItems.filter(item => item.currentId !== id));
    setLickedProductsId(lickedProductsId => lickedProductsId.filter(item => item !== id));
  };

  const toggleLikeProduct = (isProductLike, id, src, price, size, title, optionColors, items, setItems) => {
    if (isProductLike) {
      _deleteWishItem(id);
    } else {
      onSendItem(id, src, price, size, title, optionColors, items, setItems);
      _onLikeProduct(id);
    }
  };

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
    });
  };

  function filterBySearchPanel(arr) {
    const searchURL = searchParams.get('products') || '';
    return arr.filter(item => item.title.toLowerCase().includes(searchURL));
  };

  function renderProductsList(arr) {
      if (arr.length === 0) {
          return <h5 className="products__status">There are no products now</h5>;
      }

      return arr.map(({id, src, price, size, title, optionColors}, i) => {
        const optionsId = id + size + optionColors[0];
        const isProductLike = lickedProductsId.find(lickedId => lickedId === optionsId);
        const onSendParams = [optionsId, src, price, size, title, optionColors, cartItems, setCartItems, addExistingProductToCart];
        const onToggleParams = [isProductLike, optionsId, src, price, size, title, optionColors, wishItems, setWishItems];


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
                          onClick={() => onSendItem(...onSendParams)}>
                            <HiShoppingCart />
                        </button>
                        <button
                          onClick={() => {
                            toggleLikeProduct(...onToggleParams)
                          }}
                          className={isProductLike ? 'licked' : ""}>
                          {isProductLike ?
                              <AiFillHeart style={{fill: 'red'}}/> :
                              <AiFillHeart />}
                        </button>
                    </div>
                </div>
            </div>
          )
      });
  };

  function getAllFiltredProducts(arr, category) {
    if (category) {
      return renderProductsList(filterBySortPanel(products, currentFilter));
    } else {
      return renderProductsList(filterBySearchPanel(filterBySortPanel(products, currentFilter)));
    }
  };

  useEffect(() => {
    getAllProducts(category, offset)
      .then(res => setProducts(res));
      // eslint-disable-next-line
  }, []);

  if (itemLoadingStatus === "loading") {
      return <Spinner/>;
  } else if (itemLoadingStatus === "error") {
      return <h5 className="products__status">Loading error. Please try later</h5>;
  }

  const elements = getAllFiltredProducts(products, category);


  return (
    <section className="products">
      {content?.title()}
      <div className="products__items">
        {elements}
      </div>
      {content?.button()}
    </section>
  )
};

export default Products;
