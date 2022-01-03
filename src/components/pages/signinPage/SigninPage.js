import {Link, useLocation} from "react-router-dom";
import * as Yup from 'yup';
import {Formik, Form} from 'formik';
import {ToastContainer} from 'react-toastify';
import useService from '../../../hooks/useService';
import {useProvider} from '../../../contexts/DataContext.js';
import {useFeatures} from '../../../hooks/useFeatures';

import {transformValueToLowerCase, CustomField} from '../registerPage/RegisterPage.js';

import './_signinPage.scss';

const initialValues = {
  userName: '',
  password: ''
}

const SigninPage = () => {
  const location = useLocation();

  const {login} = useProvider();
  const {showStatusModal} = useFeatures();
  const {getAllUsers} = useService();

  const fromCartPage = location.state;
console.log(fromCartPage);
  const validationSchema = Yup.object({
    userName: Yup.string()
            .required('Required field')
            .transform(transformValueToLowerCase),
    password: Yup.string()
            .required('Required field')
  });

  async function handleSubmit({userName, password}) {
    try {
      const response = await getAllUsers();
      const user = await response.find(item => item.userName === userName.toLowerCase());

      if (user && user.password === password && fromCartPage) {
        login(user, fromCartPage);
      } else if (user && user.password === password) {
        login(user, '/');
        return;
      } else {
        showStatusModal('Invalid Username or Password', 'error');
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
              onSubmit={(values, {resetForm}) => {
                handleSubmit(values);
                resetForm();
            }}>
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
