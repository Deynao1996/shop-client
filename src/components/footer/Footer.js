import {FaTelegramPlane, FaInstagram, FaGithub, FaFacebook, FaMapMarkerAlt} from "react-icons/fa";
import {BsFillTelephoneFill} from "react-icons/bs";
import {AiOutlineMail} from "react-icons/ai";

import './_footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
        <div className="footer__content">
            <h5 className="footer__content-title">LAMA.</h5>
            <div className="footer__content-descr">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don’t look even slightly believable.</div>
            <div className="footer__content-socials">
                <a href="#">
                  <FaTelegramPlane />
                </a>
                <a href="#">
                  <FaInstagram />
                </a>
                <a href="#">
                  <FaGithub />
                </a>
                <a href="#">
                  <FaFacebook />
                </a>
            </div>
        </div>
        <div className="footer__links">
            <div className="footer__links-title">Useful Links</div>
            <ul className="footer__links-list">
                <li><a href="#">Home</a></li>
                <li><a href="#">Man Fashion</a></li>
                <li><a href="#">Accessories</a></li>
                <li><a href="#">Order Tracking</a></li>
                <li><a href="#">Wishlist</a></li>
                <li><a href="#">Cart</a></li>
                <li><a href="#">Woman Fashion</a></li>
                <li><a href="#">My Account</a></li>
                <li><a href="#">Wishlist</a></li>
                <li><a href="#">Terms</a></li>
            </ul>
        </div>
        <div className="footer__contact">
            <div className="footer__contact-title">Contact</div>
            <div className="footer__contact-adress">
              <FaMapMarkerAlt />
              <span>622 Dixie Path , South Tobinchester 98336</span>
            </div>
            <div className="footer__contact-tel">
              <BsFillTelephoneFill />
              <span>+1 234 56 78</span>
            </div>
            <div className="footer__contact-email">
              <AiOutlineMail />
              <span>contact@lama.dev</span>
            </div>
            <div className="footer__contact-payments">
                <img src="https://i.ibb.co/Qfvn4z6/payment.png" alt="payments"/>
            </div>
        </div>
    </footer>
  )
};

export default Footer;
