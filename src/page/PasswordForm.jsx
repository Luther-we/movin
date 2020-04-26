import React, {useState} from 'react'
import { Formik } from 'formik';
import * as yup   from 'yup'
import { Form, Col, Spinner, Button } from 'react-bootstrap'

const schemaPassword = yup.object({
  password: yup.string().required('Un mot de passe est requis'),
  confirmPassword: yup.string().required().oneOf([yup.ref('password'), null], 'Passwords must match')
});

const SignInForm = ({previousStepCb, nextStepCb, setValue}) => {
  const handleSubmit = (e) => console.log('Yes ?', e)

  return (
    <Formik
      validationSchema={schemaPassword}
      onSubmit={handleSubmit}
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
        console.log()
        return (
        <Form noValidate onSubmit={handleSubmit}>
            <Form.Group as={Col} md="4" controlId="validationFormik02">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                isValid={isValid}  
                isInvalid={errors.password && touched.password}
              />
              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationFormik03">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                isValid={touched.confirmPassword && !errors.confirmPassword}
                isInvalid={errors.confirmPassword && touched.confirmPassword}
              />
              <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          
        </Form>
      )}}
    </Formik>
  );
}

export default SignInForm