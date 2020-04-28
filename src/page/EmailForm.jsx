import React, {useState, useEffect, } from 'react'
import { Form, Col, Spinner, Button } from 'react-bootstrap'
import { Formik } from 'formik';
import * as yup   from 'yup'
import { postFetch } from '../utils/fetch/fetchMethods'

const schemaEmail = yup.object({
  email: yup.string().required('required').email("Must be a valid email address"),
});

const EmailForm = ({setEmailCb} ) => {
  const initialMessage = {errorMessage: '', message: ''}
  const [loader, setLoader ] = useState(false)
  
  const [messageState, setMessageState ] = useState(initialMessage)

  const [email, setEmail] = useState('')

  const post =  (url, body) => (
    postFetch(url,body)
        .then((res) => {
          if (res.status === 200) {
            return setEmailCb(email)
          }
            setLoader(false)
            return setMessageState({...initialMessage, errorMessage: res.errorMessage})
          })
          .catch(e => console.log('Something wrong in useEffect EmailForm', e))
  )

        
  
  useEffect(() => {
    if (email !=='') {
      post('http://localhost:8081/user/checkemail', {email: email})
    } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email])
  

  const handleSubmitCb = ({email}) => {
    setLoader(true)
    setEmail(email)
  }

  const handleOnChange = (a) => setMessageState({...initialMessage})

  return (
    <Formik
      validationSchema={schemaEmail}
      onSubmit={handleSubmitCb}
      initialValues={{
        email: ''
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
      }) => {
        return (
        <Form noValidate onSubmit={handleSubmit}>
            <Form.Group as={Col} md="4" controlId="validationFormik01">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                autoComplete="email"
                value={values.email}
                onChange={(e) => {handleOnChange(e.error); handleChange(e)}}
                isValid={messageState.message !== ''}
                isInvalid={errors.email && touched.email || messageState.errorMessage !== ''  }
                onBlur={handleBlur}
              />
                <Form.Control.Feedback>
                  {messageState.message}
                </Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">{messageState.errorMessage || errors.email}</Form.Control.Feedback>    
            </Form.Group>
        {!errors.email && values.email && !messageState.message && !messageState.errorMessage?   (loader ? 
              <Spinner animation="border" variant="dark" />
            :
              <Button type="submit">Suivant</Button>
        ):
         null  }
          
        </Form>
      )}}
    </Formik>
  )
}

export default EmailForm