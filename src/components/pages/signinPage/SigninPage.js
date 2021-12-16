import './_signinPage.scss';

const SigninPage = () => {
  return (
    <div class="login">
        <div class="login__wrapper">
            <div class="login__title">SIGN IN</div>
            <form action="#" class="login__form">
                <input type="text" placeholder="username" name="username" required />
                <input type="password" placeholder="password" name="password" required />
                <div class="login__form-submit">LOGIN</div>
                <a href="#" class="login__form-link">DO NOT YOU REMEMBER THE PASSWORD?</a>
                <a href="#" class="login__form-link">CREATE A NEW ACCOUNT</a>
            </form>
        </div>
    </div>
  )
};

export default SigninPage;
