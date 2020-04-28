import React, {useState, useEffect} from 'react'
import { Formik } from 'formik';
import * as yup   from 'yup'
import { Form, Col, Spinner, Button } from 'react-bootstrap'
import { postFetch } from "../utils/fetch/fetchMethods";
import { _setToken } from '../utils/auth/authHelperMethods';

const schemaPassword = yup.object({
  password: yup.string().required('Un mot de passe est requis'),
  confirmPassword: yup.string().required().oneOf([yup.ref('password'), null], 'Passwords must match')
});

const PasswordForm = ({setNextCb, email}) => {
  const initialMessage = {errorMessage: '', message: ''}
  const [loader, setLoader ] = useState(false)
  const [password, setPassword] = useState('')
  const [messageState, setMessageState ] = useState(initialMessage)

  const post = (url, body) => (
    postFetch(url,body)
    .then((res) => {
      if (res.status === 201) {
        _setToken(res.user.token)
        return setNextCb()
      }
      return setLoader(false)
    })
    .catch(e => console.log('Something wrong in useEffect PasswordForm', e))
  )

  useEffect(() => {
    if (password !== '') {
      post('http://localhost:8081/user/signin', {
        email: email,
        password: password
      })    
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password])

  const handleSubmit = ({password}) => {
    setLoader(true)
    setPassword(password)
  }

  const handleOnChange = (a) => setMessageState({...initialMessage})

  return (
    <Formik
      validationSchema={schemaPassword}
      onSubmit={(e) => {handleOnChange(); handleSubmit(e)}}
      suggested="new-password"
      initialValues={{
        password: '',
        confirmPassword:''
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
            <Form.Group as={Col} md="4" controlId="validationFormik02">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                autoComplete="new-password"
                // isValid={isValid && touched.password}
                isInvalid={errors.password}
              />
              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationFormik03">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                isValid={touched.confirmPassword && !errors.confirmPassword}
                isInvalid={errors.confirmPassword}
                autoComplete="new-password"
              />
              
              <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            {!errors.password && values.password && !messageState.message ?   (loader ? 
              <Spinner animation="border" variant="dark" />
            :
              <Button type="submit">Suivant</Button>
      )
      :
         null  }
          
        </Form>
      )}}
    </Formik>
  );
}

export default PasswordForm