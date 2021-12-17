import {Link} from 'react-router-dom';

import {FaSearch} from 'react-icons/fa';
import {HiShoppingCart} from "react-icons/hi";
import {AiFillHeart} from "react-icons/ai";

import './_products.scss';

const Products = () => {
  return (
    <section className="products">
        <div className="products__items">
            <div className="products__item">
                <div className="products__item_inner">
                    <div className="products__item_inner-circle">
                          <img src="https://d3o2e4jr3mxnm3.cloudfront.net/Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg.png" alt="product"/>
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
            <div className="products__item">
                <div className="products__item_inner">
                    <div className="products__item_inner-circle">
                          <img src="https://d3o2e4jr3mxnm3.cloudfront.net/Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg.png" alt="product"/>
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
            <div className="products__item">
                <div className="products__item_inner">
                    <div className="products__item_inner-circle">
                          <img src="https://d3o2e4jr3mxnm3.cloudfront.net/Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg.png" alt="product"/>
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
            <div className="products__item">
                <div className="products__item_inner">
                    <div className="products__item_inner-circle">
                          <img src="https://d3o2e4jr3mxnm3.cloudfront.net/Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg.png" alt="product"/>
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
            <div className="products__item">
                <div className="products__item_inner">
                    <div className="products__item_inner-circle">
                          <img src="https://d3o2e4jr3mxnm3.cloudfront.net/Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg.png" alt="product"/>
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
            <div className="products__item">
                <div className="products__item_inner">
                    <div className="products__item_inner-circle">
                          <img src="https://d3o2e4jr3mxnm3.cloudfront.net/Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg.png" alt="product"/>
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
            <div className="products__item">
                <div className="products__item_inner">
                    <div className="products__item_inner-circle">
                          <img src="https://d3o2e4jr3mxnm3.cloudfront.net/Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg.png" alt="product"/>
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
            <div className="products__item">
                <div className="products__item_inner">
                    <div className="products__item_inner-circle">
                          <img src="https://d3o2e4jr3mxnm3.cloudfront.net/Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg.png" alt="product"/>
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
        </div>
    </section>
  )
};

export default Products;
