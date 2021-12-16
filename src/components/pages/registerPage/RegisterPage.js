import './_registerPage.scss'

const RegisterPage = () => {
  return (
    <div className="create">
      <div className="create__wrapper">
        <div className="create__title">CREATE AN ACCOUNT</div>
        <form action="#" className="create__form">
            <input type="text" placeholder="name" name="name"/>
            <input type="text" placeholder="last name" name="last name"/>
            <input type="text" placeholder="username" name="username"/>
            <input type="email" placeholder="email" name="email"/>
            <input type="password" placeholder="password" name="password"/>
            <input type="password" placeholder="confirm password" name="confirm password"/>
            <span>By creating an account, I consent to the processing of my personal data in accordance with the <b>PRIVACY POLICY</b></span>
            <button type="submit" name="button" className="create__form-submit">CREATE</button>
        </form>
      </div>
    </div>
  )
};

export default RegisterPage;
