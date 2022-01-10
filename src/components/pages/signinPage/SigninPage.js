import {Link, useLocation} from "react-router-dom";
import * as Yup from 'yup';
import {Formik, Form} from 'formik';
import {ToastContainer} from 'react-toastify';
import useService from '../../../hooks/useService';
import {useProvider} from '../../../contexts/DataContext.js';
import {useFeatures} from '../../../hooks/useFeatures';

import {CustomField} from '../registerPage/RegisterPage.js';

import './_signinPage.scss';

const initialValues = {
  userName: '',
  password: ''
}

const SigninPage = () => {
  const location = useLocation();

  const {login} = useProvider();
  const {showStatusModal} = useFeatures();
  const {signIn} = useService();

  const fromCartPage = location.state;

  const validationSchema = Yup.object({
    userName: Yup.string()
            .required('Required field'),
    password: Yup.string()
            .required('Required field')
  });

  async function handleSubmit({userName, password}) {
    try {
      const user = await signIn(JSON.stringify({
        userName: userName.toLowerCase(),
        password
      }));

      if (user.errorMessage) {
        return showStatusModal(user.errorMessage, 'error');
      }

      if (user && fromCartPage) {
        login(user, fromCartPage);
      } else if (user) {
        login(user, '/');
      }
    } catch (e) {
      showStatusModal('Something went wrong. Try later', 'error');
    }
  };


  return (
    <div className="login">
        <div className="login__wrapper">
            <div className="login__title">SIGN IN</div>
            <ToastContainer />
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}>
            {({isSubmitting}) => (
              <Form className="login__form">
                <CustomField
                  type="text"
                  placeholder="username"
                  id="userName"
                  name="userName"/>
                <CustomField
                  type="password"
                  placeholder="password"
                  name="password"
                  id="password"/>
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="login__form-submit">
                    LOGIN
                </button>
                <Link to="/" className="login__form-link">HOME PAGE</Link>
                <Link to="/register" className="login__form-link">CREATE A NEW ACCOUNT</Link>
              </Form>
            )}
            </Formik>
        </div>
    </div>
  )
};

export default SigninPage;
