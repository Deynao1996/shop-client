import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import * as Yup from 'yup';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {ToastContainer} from 'react-toastify';

import useService from '../../../hooks/useService';
import {useFeatures} from '../../../hooks/useFeatures';

import './_registerPage.scss';
import 'react-toastify/dist/ReactToastify.css';

const initialValues = {
  name: '',
  lastName: '',
  userName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

export function transformValueToLowerCase(value, originalvalue) {
  return this.isType(value) && value !== null ? value.toLowerCase() : value;
}

const RegisterPage = () => {
  const [existedUserData, setExistedUserData] = useState({
    emails: [],
    userNames: []
  });
  const {emails, userNames} = existedUserData;

  const {getAllUsers, createNewUser} = useService();
  const {showStatusModal} = useFeatures();

  const validationSchema = Yup.object({
    name: Yup.string()
            .required('Required field')
            .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field'),
    lastName: Yup.string()
            .required('Required field')
            .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field'),
    userName: Yup.string()
            .required('Required field')
            .notOneOf(userNames, 'This username allready exist')
            .transform(transformValueToLowerCase),
    email: Yup.string()
            .required('Required field')
            .email("Invalid email format")
            .notOneOf(emails, 'This email allready exist')
            .transform(transformValueToLowerCase),
    password: Yup.string()
            .required('Required field'),
    confirmPassword: Yup.string()
            .required('Required field')
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
  });

  const setExistedsUsers = (arr) => {
    const userNames = [];
    const emails = [];

    arr.forEach(item => {
      userNames.push(item.userName.toLowerCase());
      emails.push(item.email.toLowerCase());
    });

    setExistedUserData({emails, userNames})
  };

  async function createUser({name, email, lastName, userName, password}) {
    const user = {
      name,
      lastName,
      userName: userName.toLowerCase(),
      email: email.toLowerCase(),
      password
    };

    try {
      const newUser = await createNewUser(JSON.stringify(user));

      const existedUsers = await getAllUsers();
      setExistedsUsers(existedUsers);

      if (newUser) {
        showStatusModal('Success! Your account has been created', 'success');
      }
    } catch (e) {
      showStatusModal('Something went wrong. Please try later', 'error');
    }
  };

  useEffect(() => {
    getAllUsers()
      .then(res => setExistedsUsers(res));
      // eslint-disable-next-line
  }, []);


  return (
    <div className="create">
      <div className="create__wrapper">
        <div className="create__title">CREATE AN ACCOUNT</div>
        <ToastContainer />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, {resetForm}) => {
              createUser(values)
              resetForm();
            }}>
            {({isSubmitting}) => (
              <Form className="create__form">
                <div className="create__form-input">
                  <CustomField
                    type="text"
                    placeholder="name"
                    name="name"
                    id="name"/>
                </div>
                <div className="create__form-input">
                  <CustomField
                    type="text"
                    placeholder="last name"
                    name="lastName"
                    id="lastName"/>
                </div>
                <div className="create__form-input">
                  <CustomField
                    type="text"
                    placeholder="username"
                    name="userName"
                    id="userName"/>
                </div>
                <div className="create__form-input">
                  <CustomField
                    type="email"
                    placeholder="email"
                    name="email"
                    id="email"/>
                </div>
                <div className="create__form-input">
                  <CustomField
                    type="password"
                    placeholder="password"
                    name="password"
                    id="password"/>
                </div>
                <div className="create__form-input">
                  <CustomField
                    type="password"
                    placeholder="confirm password"
                    name="confirmPassword"
                    id="confirmPassword"/>
                </div>
                <span>By creating an account, I consent to the processing of my personal data in accordance with the <b>PRIVACY POLICY</b></span>
                <button
                  type="submit"
                  name="button"
                  className="create__form-submit"
                  disabled={isSubmitting}>
                    CREATE
                </button>
                <div className="create__form-links">
                  <Link to="/">Home page</Link>
                  <Link to="/signin">Sign in</Link>
                </div>
              </Form>
            )}
          </Formik>
    </div>
  </div>
  )
};

export const CustomField = ({type, placeholder, name, ...props}) => {
  return (
    <>
      <Field
        type={type}
        placeholder={placeholder}
        name={name}
        id={name}
        {...props}/>
      <ErrorMessage className="errorMessage" name={name} component="div"/>
    </>
  )
};

export default RegisterPage;
