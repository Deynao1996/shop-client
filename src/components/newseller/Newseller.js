import {FaTelegramPlane} from "react-icons/fa";

import './_newseller.scss';

const Newseller = () => {
  return (
    <section className="newseller">
        <div className="newseller__content">
            <h3 className="newseller__content-title">Newsletter</h3>
            <div className="newseller__content-descr">Get timely updates from your favorite products.</div>
            <form action="#" className="newseller__form">
                <input type="text" placeholder="Your email"/>
                <button type="submit" name="button">
                  <FaTelegramPlane />
                </button>
            </form>
        </div>
    </section>
  )
};

export default Newseller;
