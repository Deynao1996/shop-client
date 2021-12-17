import {Link} from "react-router-dom";

import './_signinPage.scss';

const SigninPage = () => {
  return (
    <div className="login">
        <div className="login__wrapper">
            <div className="login__title">SIGN IN</div>
            <form action="#" className="login__form">
                <input type="text" placeholder="username" name="username" required />
                <input type="password" placeholder="password" name="password" required />
                <div className="login__form-submit">LOGIN</div>
                <a href="#" className="login__form-link">DO NOT YOU REMEMBER THE PASSWORD?</a>
                <Link to="/register" className="login__form-link">CREATE A NEW ACCOUNT</Link>
            </form>
        </div>
    </div>
  )
};

export default SigninPage;
