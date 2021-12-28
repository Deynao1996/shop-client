import {Formik, Form} from 'formik';
import {ToastContainer} from 'react-toastify';
import {useNavigate} from 'react-router-dom';

import {useCart} from '../../contexts/CartContext.js';
import useHttp from '../../hooks/http.hook.js';
import {showStatusModal, CustomField} from '../pages/registerPage/RegisterPage.js';

import {FaTelegramPlane} from "react-icons/fa";

import './_newseller.scss';

const initialValues = {
  newsellerEmail: ''
}

const Newseller = () => {

  const navigate = useNavigate();
  const {request} = useHttp();
  const {currentUser, setCurrentUser, login} = useCart();

  async function handleSubmit(values) {
    if (!currentUser) {
      return navigate('/signin');
    }

    const currentEmail = values.newsellerEmail;
    const userId = currentUser.id;

    try {
      await request(
        `http://localhost:3001/users/${userId}`,
        'PUT',
        JSON.stringify({...currentUser, ...values}));

      const newObj = {...currentUser, newsellerEmail: currentEmail};
      login(newObj);

      showStatusModal('success', `${currentEmail} started to following news`);
    } catch (e) {
      showStatusModal('error', 'Something went wrong. Try later');
    }
  }

  return (
    <section className="newseller">
        <div className="newseller__content">
            <h3 className="newseller__content-title">Newsletter</h3>
            <div className="newseller__content-descr">Get timely updates from your favorite products.</div>
            <ToastContainer />
            <Formik
              initialValues={initialValues}
              onSubmit={(values, {resetForm}) => {
                handleSubmit(values);
                resetForm();
              }}>
                {({isSubmitting}) => (
                  <Form className="newseller__form">
                    <CustomField
                      type="email"
                      placeholder={currentUser?.newsellerEmail ? "YOU ALREADY HAS BEEN SUBSCRIBED ON THE NEWSELLER" : "your email"}
                      id="newsellerEmail"
                      name="newsellerEmail"
                      required={true}/>
                    <button
                      disabled={currentUser?.newsellerEmail || isSubmitting}
                      type="submit">
                        <FaTelegramPlane />
                    </button>
                  </Form>
                )}
            </Formik>
        </div>
    </section>
  )
};

export default Newseller;
