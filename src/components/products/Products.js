import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';

import useHttp from '../../hooks/http.hook.js';
import Spinner from '../spinner/Spinner.js'

import {FaSearch} from 'react-icons/fa';
import {HiShoppingCart} from "react-icons/hi";
import {AiFillHeart} from "react-icons/ai";

import './_products.scss';

const Products = ({category}) => {

  const [products, setProducts] = useState([]);
  const {request, itemLoadingStatus} = useHttp();

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

      return arr.map(({id, src}) => {
          return (
            <div
              className="products__item"
              key={id}>
                <div className="products__item_inner">
                    <div className="products__item_inner-circle">
                          <img src={src} alt="product"/>
                    </div>
                </div>
                <div className="products__item_outer">
                    <div className="products__item_outer-links">
                        <Link to="/products/123">
                          <FaSearch />
                        </Link>
                        <Link to="/cart">
                          <HiShoppingCart />
                        </Link>
                        <a href="#">
                          <AiFillHeart />
                        </a>
                    </div>
                </div>
            </div>
          )
      })
  }

  useEffect(() => {
    request('http://localhost:3001/products')
      .then(setProducts)
  }, []);

  if (itemLoadingStatus === "loading") {
      return <Spinner/>;
  } else if (itemLoadingStatus === "error") {
      return <h5 className="products__status">Loading error</h5>
  }

  const elements = renderProductsList(filterByCategory(products, category));

  return (
    <section className="products">
      <div className="products__items">
        {elements}
      </div>
    </section>
  )
};

export default Products;
