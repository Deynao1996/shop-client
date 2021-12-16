import {AiOutlineArrowLeft} from "react-icons/ai";
import {AiOutlineArrowRight} from "react-icons/ai";

import './_slider.scss';

const Slider = () => {
  return (
    <section className="slider">
        <div className="slider__item">
            <div className="slider__item-img"><img src="https://i.ibb.co/DG69bQ4/2.png" alt="girl"/></div>
            <div className="slider__item-content">
                <h1>AUTUMN COLLECTION</h1>
                <span>DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.</span>
                <button className="slider__btn">SHOW NOW</button>
            </div>
        </div>
        <div className="slider__left">
          <AiOutlineArrowLeft />
        </div>
        <div className="slider__right">
          <AiOutlineArrowRight />
        </div>
    </section>
  )
};

export default Slider;
