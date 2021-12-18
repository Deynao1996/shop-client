import {Link} from 'react-router-dom';
import Slider from "react-slick";

import {AiOutlineArrowLeft} from "react-icons/ai";
import {AiOutlineArrowRight} from "react-icons/ai";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './_carousel.scss';

const NextArrow = ({onClick}) => {
  return (
    <div
      className="slider__right"
      onClick={onClick}>
        <AiOutlineArrowRight />
    </div>
  )
}

const PrevArrow = ({onClick}) => {
  return (
    <div
      className="slider__left"
      onClick={onClick}>
        <AiOutlineArrowLeft />
    </div>
  )
}

const Carousel = () => {

  const settings = {
    className: 'slider',
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };


  return (
    <Slider {...settings} >
        <div className="slider__item test" style={{padding: '20px', margin: '121212'}}>
            <div className="slider__item-img"><img src="https://i.ibb.co/DG69bQ4/2.png" alt="girl"/></div>
            <div className="slider__item-content">
                <h1>AUTUMN COLLECTION</h1>
                <span>DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.</span>
                <Link to="/products" className="slider__btn">SHOW NOW</Link>
            </div>
        </div>

        <div className="slider__item test" style={{padding: '20px'}}>
            <div className="slider__item-img"><img src="https://i.ibb.co/DG69bQ4/2.png" alt="girl"/></div>
            <div className="slider__item-content">
                <h1>AUTUMN COLLECTION</h1>
                <span>DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.</span>
                <Link to="/products" className="slider__btn">SHOW NOW</Link>
            </div>
        </div>

        <div className="slider__item test" style={{padding: '20px'}}>
            <div className="slider__item-img"><img src="https://i.ibb.co/DG69bQ4/2.png" alt="girl"/></div>
            <div className="slider__item-content">
                <h1>AUTUMN COLLECTION</h1>
                <span>DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.</span>
                <Link to="/products" className="slider__btn">SHOW NOW</Link>
            </div>
        </div>
    </Slider>
  )
};

export default Carousel;
