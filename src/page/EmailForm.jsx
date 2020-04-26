import React, {useState, } from 'react'
import { Form, Col, Spinner, Button } from 'react-bootstrap'
import { Formik } from 'formik';
import * as yup   from 'yup'

const schemaEmail = yup.object({
  email: yup.string().required('required').email("Must be a valid email address"),
});

const EmailForm = ({nextStepCb, setEmailCb} ) => {
  const initialMessage = {errorMessage: '', message: ''}
  const [loader, setLoader ] = useState(false)
  const [messageState, setMessageState ] = useState(initialMessage)

  const handleSubmit = ({email}, form) => {
    setLoader(true)
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    fetch('http://localhost:8081/user/checkemail', {
      method: 'POST',
      headers,
      body: JSON.stringify({email: email})
    })
    .then(data => data.json())
    .then(data => {
      setEmailCb(email)
      setMessageState({...initialMessage, ...data})
      nextStepCb()
      
    })
    .catch(e => {
      console.log('error fetch ===> ', e)
    })
    setLoader(false)
  }

  const handleOnChange = (a) => setMessageState({...initialMessage})


  console.log('Message', messageState)

  return (
    <Formik
      validationSchema={schemaEmail}
      onSubmit={(a, e) => handleSubmit(a, e)}
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
        {!errors.email && values.email && !messageState.message ?   (loader ? 
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