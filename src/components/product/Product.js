import {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";

import useHttp from '../../hooks/http.hook.js';
import {useCart} from '../../contexts/CartContext.js';

import Spinner from '../spinner/Spinner.js';

import './_product.scss';

const Product = () => {
  const {id} = useParams();
  const {setCartItems, cartItems, addExistedProductToCart} = useCart();
  const {request, itemLoadingStatus} = useHttp();

  const [selectedProduct, setSelectedProduct] = useState({});
  const [selectedProductOptions, setSelectedProductOptions] = useState({
    currentId: null,
    currentSize: null,
    currentColor: null,
    currentSum: 1,
    currentSrc: null,
    currentPrice: null,
    currentTitle: null
  })

  const getProductById = (arr, id) => {
    arr.forEach(item => {
      if (item.id === id) {
        setSelectedProduct(item);
        setSelectedProductOptions(({currentId, currentSize, currentColor, currentSum}) => {
          const optionCurrentId = id + item.optionSizes[0] + item.optionColors[0];
          return {
            currentId: optionCurrentId,
            currentSize: item.optionSizes[0],
            currentColor: item.optionColors[0],
            currentSum: currentSum,
            currentSrc: item.src,
            currentPrice: item.price,
            currentTitle: item.title
          }
        });
      }
    });
  }

  const _setOption = (e, point, propName) => {
    const value = point ? point : e.target.value;
    setSelectedProductOptions(selectedProductOptions => {
      return {...selectedProductOptions, [propName]: value}
    })
  }

  const onSizeSelected = (e) => {
    const value = e.target.value;
    const newId = selectedProductOptions.currentId.replace(/\D/g, "") + value + selectedProductOptions.currentColor;
    setSelectedProductOptions(selectedProductOptions => {
      return {...selectedProductOptions, currentSize: value, currentId: newId}
    })
  }

  const onColorSelected = (e, colorName) => {
    const value = colorName;
    const newId = selectedProductOptions.currentId.replace(/\D/g, "") + selectedProductOptions.currentSize + value;
    setSelectedProductOptions(selectedProductOptions => {
      return {...selectedProductOptions, currentColor: value, currentId: newId}
    })
  }

  const onSumSelected = (e, n) => {
    const value = selectedProductOptions.currentSum + n;
    if (value < 1 || value > 999) {
      return;
    }
    _setOption(e, value, 'currentSum');
  }

  const onHandlerSumSelected = (e) => {
    const value = +e.target.value.replace(/\D/g, "");
    if (value > 999) {
      return;
    }
    _setOption(e, value, 'currentSum');
  }

  const onInputBlur = () => {
    if (typeof selectedProductOptions.currentSum === "string") {
      setSelectedProductOptions(selectedProductOptions => ({...selectedProductOptions, currentSum: 1}))
    }
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
        onClick={(e) => onColorSelected(e, colorName)}></div>
    })
  }

  function resetProductOptions() {
    setSelectedProductOptions(selectedProductOptions => {
      return {...selectedProductOptions,
        currentSum: 1,
        currentSize: selectedProduct.optionSizes[0],
        currentColor: selectedProduct.optionColors[0],
        }
    })
  }

  function onSendProduct() {
    const isProductExist = addExistedProductToCart(cartItems, selectedProductOptions.currentId, selectedProductOptions.currentSum);
    resetProductOptions();
    if (isProductExist) {
      return;
    }

    setCartItems(cartItems => ([...cartItems, selectedProductOptions]));
  }

  useEffect(() => {
    request('http://localhost:3001/products')
      .then(res => getProductById(res, id))
      // eslint-disable-next-line
  }, [id])

  if (itemLoadingStatus === "loading") {
      return <Spinner/>;
  } else if (itemLoadingStatus === "error") {
      return <h5 className="products__status">Loading error</h5>
  }

  const {src, price, title, description, optionSizes, optionColors} = selectedProduct;
  const optionsListItems = renderOptionsList(optionSizes);
  const colorsListItems = renderColorsList(optionColors);


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
                    {colorsListItems}
                </div>
                <div className="product__size">
                  <span>Size</span>
                  <select
                    name="select"
                    value={selectedProductOptions.currentSize || "0"}
                    onChange={(e) => onSizeSelected(e)}>
                      {optionsListItems}
                  </select>
                </div>
            </div>
            <div className="product__send">
                <div className="product__calc">
                    <div
                      className="product__minus"
                      onClick={(e) => onSumSelected(e, -1)}>
                        &#8722;
                    </div>
                    <input
                      type="text"
                      name="sum"
                      className="product__sum"
                      value={selectedProductOptions.currentSum}
                      onChange={(e) => onHandlerSumSelected(e)}
                      onBlur={() => onInputBlur()}/>
                    <div
                      className="product__plus"
                      onClick={(e) => onSumSelected(e, 1)}>
                        &#43;
                    </div>
                </div>
                <button
                  className="product__submit"
                  onClick={onSendProduct}>
                    Add to cart
                </button>
            </div>
        </div>
    </section>
  )
};

export default Product;
