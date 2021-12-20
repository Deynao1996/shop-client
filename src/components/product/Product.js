import {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";

import useHttp from '../../hooks/http.hook.js';

import Spinner from '../spinner/Spinner.js';

import './_product.scss';

const Product = () => {
  const {id} = useParams();
  const {request, itemLoadingStatus} = useHttp();

  const [selectedProduct, setSelectedProduct] = useState({});
  const [selectedProductOptions, setSelectedProductOptions] = useState({
    currentId: null,
    currentSize: null,
    currentColor: null,
    currentSum: 1
  })

  const getProductById = (arr, id) => {
    arr.forEach(item => {
      if (item.id === id) {
        setSelectedProduct(item);
        setSelectedProductOptions(({currentId, currentSize, currentColor, currentSum}) => {
          return {
            currentId: id,
            currentSize: item.optionSizes[0],
            currentColor: item.optionColors[0],
            currentSum: currentSum
          }
        });
      }
    });
  }

  const onSizeSelected = (e) => {
    setSelectedProductOptions(selectedProductOptions => {
      return {...selectedProductOptions, currentSize: e.target.value}
    })
  }

  const onColorSelected = (colorName) => {
    setSelectedProductOptions(selectedProductOptions => {
      return {...selectedProductOptions, currentColor: colorName}
    })
  }

  const onSumSelected = (n) => {
    setSelectedProductOptions(selectedProductOptions => {
      return {...selectedProductOptions, currentSum: selectedProductOptions.currentSum + n}
    })
  }

  const onHandlerSumSelected = (e) => {
    setSelectedProductOptions(selectedProductOptions => {
      return {...selectedProductOptions, currentSum: +e.target.value.replace(/\D/g, "") < 1 ? 1 : +e.target.value.replace(/\D/g, "")}
    })
  }

  function renderOptionsList(arr) {
    if (!arr || arr.length === 0) {
      return <option value="0">No options yet</option>
    }
    return arr.map((item, i) => {
      return <option
        key={i}
        value={item}>
          {item}
        </option>
    })
  }

  function renderColorsList(arr) {
    if (!arr || arr.length === 0) {
      return <span>No colors yet</span>
    }
    return arr.map((colorName, i) => {
      return <div
        style={{backgroundColor: colorName}}
        key={i}
        className={`product__circle ${selectedProductOptions.currentColor === colorName ? 'product__circle_active' : ''}`}
        onClick={() => onColorSelected(colorName)}></div>
    })
  }

  useEffect(() => {
    request('http://localhost:3001/products')
      .then(res => getProductById(res, id))
      // eslint-disable-next-line
  }, [id]);

  if (itemLoadingStatus === "loading") {
      return <Spinner/>;
  } else if (itemLoadingStatus === "error") {
      return <h5 className="products__status">Loading error</h5>
  }

  const {src, price, title, description, optionSizes, optionColors} = selectedProduct;
  const optionsList = renderOptionsList(optionSizes);
  const colorsList = renderColorsList(optionColors);


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
                  {colorsList}
                </div>
                <div className="product__size">
                  <span>Size</span>
                  <select
                    name="select"
                    value={selectedProductOptions.currentSize || "0"}
                    onChange={(e) => onSizeSelected(e)}>
                      {optionsList}
                  </select>
                </div>
            </div>
            <div className="product__send">
                <div className="product__calc">
                    <div
                      className="product__minus"
                      onClick={() => onSumSelected(-1)}>
                        &#8722;
                    </div>
                    <input
                      type="text"
                      name="sum"
                      className="product__sum"
                      value={selectedProductOptions.currentSum}
                      onChange={(e) => onHandlerSumSelected(e)}/>
                    <div
                      className="product__plus"
                      onClick={() => onSumSelected(1)}>
                        &#43;
                    </div>
                </div>
                <button className="product__submit">Add to cart</button>
            </div>
        </div>
    </section>
  )
};

export default Product;
