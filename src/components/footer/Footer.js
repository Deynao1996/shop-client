import {Link} from 'react-router-dom';

import {FaTelegramPlane, FaInstagram, FaGithub, FaFacebook, FaMapMarkerAlt} from "react-icons/fa";
import {BsFillTelephoneFill} from "react-icons/bs";
import {AiOutlineMail} from "react-icons/ai";

import './_footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
        <div className="footer__content">
            <h5 className="footer__content-title">SHOP.</h5>
            <div className="footer__content-descr">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don’t look even slightly believable.</div>
            <div className="footer__content-socials">
                <a href="https://web.telegram.org/" target="_blank" rel="noopener noreferrer">
                  <FaTelegramPlane />
                </a>
                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                  <FaInstagram />
                </a>
                <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
                  <FaGithub />
                </a>
                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                  <FaFacebook />
                </a>
            </div>
        </div>
        <div className="footer__links">
            <div className="footer__links-title">Useful Links</div>
            <ul className="footer__links-list">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/register">Create Acount</Link></li>
                <li><Link to="/signin">Sign In</Link></li>
                <li><Link to="/cart">Cart | Wishlist</Link></li>
                <li><Link to="/products/all">All Products</Link></li>
                <li><Link to="/products/summer">Summer Collection</Link></li>
                <li><Link to="/products/autumn">Autum Collection</Link></li>
                <li><Link to="/products/loungewear">Loungewear Lowe</Link></li>
            </ul>
        </div>
        <div className="footer__contact">
            <div className="footer__contact-title">Contact</div>
            <address className="footer__contact-adress">
              <FaMapMarkerAlt />
              <span>622 Dixie Path , South Tobinchester 98336</span>
            </address>
            <div className="footer__contact-tel">
              <BsFillTelephoneFill />
              <a href="tel:+12345678">+1 234 56 78</a>
            </div>
            <div className="footer__contact-email">
              <AiOutlineMail />
              <a href="mailto:contact@gmail.dev">contact@gmail.dev</a>
            </div>
            <div className="footer__contact-payments">
                <img src="https://i.ibb.co/Qfvn4z6/payment.png" alt="payments"/>
            </div>
        </div>
    </footer>
  )
};

export default Footer;
