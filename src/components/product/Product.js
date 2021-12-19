import {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";

import useHttp from '../../hooks/http.hook.js';

import Spinner from '../spinner/Spinner.js';

import './_product.scss';

const Product = () => {
  const {id} = useParams();
  const {request, itemLoadingStatus} = useHttp();

  const [selectedProduct, setSelectedProduct] = useState({});
  const [productFeatures, setProductFeatures] = useState({
    color: 'blue',
    size: 'xs',
    sum: 1
  });

  const getProductById = (arr, id) => {
    arr.forEach(item => {
      if (item.id === id) {
        setSelectedProduct(item);
      }
    });
  };

  useEffect(() => {
    request('http://localhost:3001/products')
      .then(res => getProductById(res, id));
  }, [id]);

  if (itemLoadingStatus === "loading") {
      return <Spinner/>;
  } else if (itemLoadingStatus === "error") {
      return <h5 className="products__status">Loading error</h5>
  }

  const {src, price, title, description} = selectedProduct;
  const {color, size, sum} = productFeatures;

  return (
    <section className="product">
        <div className="product__logo">
            <img src={src} alt="pdoduct"/>
        </div>
        <div className="product__content">
            <div className="product__title">{title}</div>
            <p className="product__descr">{description}</p>
            <div className="product__price">$ {price}</div>
            <div className="product__features">
                <div className="product__color">
                  <span>Color</span>
                  <div style={{backgroundColor: 'darkblue'}} className="product__circle product__circle_active"></div>
                  <div style={{backgroundColor: 'black'}} className="product__circle"></div>
                  <div style={{backgroundColor: 'gray'}} className="product__circle"></div>
                </div>
                <div className="product__size">
                  <span>Size</span>
                  <select name="select">
                    <option value={size}>XS</option>
                    <option value="s">S</option>
                    <option value="m">M</option>
                    <option value="l">L</option>
                    <option value="xl">XL</option>
                  </select>
                </div>
            </div>
            <div className="product__send">
                <div className="product__calc">
                    <div className="product__minus">&#8722;</div>
                    <input type="text" name="sum" className="product__sum" defaultValue={productFeatures.sum}/>
                    <div className="product__plus">&#43;</div>
                </div>
                <button className="product__submit">Add to cart</button>
            </div>
        </div>
    </section>
  )
};

export default Product;
