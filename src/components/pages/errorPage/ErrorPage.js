import {Link, useNavigate} from "react-router-dom";
import useParallax from '../../../hooks/useParallax.js';

import './_errorPage.scss';

const ErrorPage = () => {
  const navigate = useNavigate();

  const {ParallaxContainer} = useParallax({
    className: 'error__container',
    sensivity: 200
  });


  return (
    <div className="error">
      <ParallaxContainer>
        <div className="error__wrapper">
            <h1>ERROR 404</h1>
            <h2>Page is non found</h2>
            <span onClick={() => navigate(-1)}>Go to previous page</span>
            <Link to="/" className="login__form-link">Go home</Link>
        </div>
      </ParallaxContainer>
    </div>
  )
};

export default ErrorPage;
