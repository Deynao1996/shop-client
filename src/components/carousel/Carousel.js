import {useState} from 'react';
import {Link} from 'react-router-dom';
import Slider from "react-slick";
import {useSpring, animated} from 'react-spring';
import Typical from 'react-typical';

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
};

const PrevArrow = ({onClick}) => {
  return (
    <div
      className="slider__left"
      onClick={onClick}>
        <AiOutlineArrowLeft />
    </div>
  )
};

const sliderContent = [
  {
    src: 'https://www.pngall.com/wp-content/uploads/2016/04/Girl-Transparent.png',
    title: 'AUTUMN COLLECTION',
    subtitle: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
    category: 'autumn'
  },
  {
    src: 'https://i.ibb.co/cXFnLLV/3.png',
    title: 'AUTUMN COLLECTION',
    subtitle: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
    category: 'loungewear'
  },
  {
    src: 'https://i.ibb.co/DG69bQ4/2.png',
    title: 'SUMMER SALE',
    subtitle: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
    category: 'summer'
  }
]

const Carousel = () => {
  const [imageIndex, setImageIndex] = useState(0);

  const settings = {
    className: 'slider',
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current, next) => {
      setTimeout(() => {
        setImageIndex(next);
      }, 1000)
    }
  };

  const props = useSpring({
    loop: true,
    to: [
      {backgroundColor: 'indianred'},
      {backgroundColor: 'teal'}
    ],
    from: { backgroundColor: 'teal' },
    config: {
      duration: 10000
    }
  });

  function renderSlideItems(arr, springProps) {
    return arr.map(({src, title, subtitle, category}, i) => (
      <div
        className="slider__item"
        key={i}>
          <div className="slider__item-img">
            <animated.div
              className="slider__item-img-circle"
              style={props}></animated.div>
            <img src={src} alt="girl"/>
          </div>
          <div className="slider__item-content">
              <h1>{title}</h1>
              {
                i === imageIndex ?
                <Typical
                  steps={[subtitle, 10000]}
                  wrapper="span"/> :
                  <span></span>
              }
              <Link to={`/products/${category}`} className="slider__btn">SHOW NOW</Link>
          </div>
      </div>
    ))
  };

  const slideItems = renderSlideItems(sliderContent, props);


  return (
    <Slider {...settings} >
        {slideItems}
    </Slider>
  )
};

export default Carousel;
