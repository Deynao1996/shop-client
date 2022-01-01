import {Formik, Form} from 'formik';
import {ToastContainer} from 'react-toastify';
import {useProvider} from '../../contexts/DataContext.js';
import useService from '../../hooks/useService';
import {useFeatures} from '../../hooks/useFeatures';
import {CustomField} from '../pages/registerPage/RegisterPage.js';
import {Parallax} from 'react-parallax';

import {FaTelegramPlane} from "react-icons/fa";
import './_newseller.scss';

const initialValues = {
  newsellerEmail: ''
};

const Newseller = () => {
  const {currentUser, login} = useProvider();
  const {showStatusModal, redirectTo} = useFeatures();
  const {putNewsellerEmail} = useService();

  async function handleSubmit(values) {
    if (!currentUser) {
      return redirectTo('/signin', false);
    }

    const currentEmail = values.newsellerEmail;
    const userId = currentUser.id;
    const data = JSON.stringify({...currentUser, ...values});

    try {
      await putNewsellerEmail(userId, data);

      const newObj = {...currentUser, newsellerEmail: currentEmail};
      login(newObj);

      showStatusModal(`${currentEmail} started to following news`, 'success' );
    } catch (e) {
      showStatusModal('Something went wrong. Try later', 'error');
    }
  };


  return (
    <section className="newseller">
      <Parallax
        bgImage={'https://www.thebeach.ae/-/media/Project/MeraasEcosystem/Beach/Shops/beach-shop-overview.jpg?h=600&w=1200&hash=6C51EAE3278D8962E90DFB05D59EC504'}
        strength={500}
        style={{height: '100%'}}
        bgImageStyle={{opacity: '0.5'}}>
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
      </Parallax>
    </section>
  )
};

export default Newseller;
