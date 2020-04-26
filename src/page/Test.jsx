import React, {useState} from 'react'
import { Formik } from 'formik';
import * as yup   from 'yup'
import { Form, Col, Spinner, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import EmailForm from './EmailForm'
import SignInForm from './PasswordForm'

const FormExample = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [display, setDisplay] = useState(1)

  const nextStep = () => setDisplay(display+1)
  const previousStep = () => setDisplay(display-1)
  const callSetEmail = a => setEmail(a)
  const callSetPassword = a => setPassword(a)
  
  const getView = () => {
    console.log('email ===> ', email)
    if (display === 1) {
      return (<EmailForm 
        nextStepCb={nextStep}
        setEmailCb={callSetEmail}
      />)
    } else if (display === 2) {
      return (<SignInForm
        previousStepCb={previousStep}
        nextStepCb={nextStep}
        setValue={callSetPassword}
      />)
    }
  }
  return (
    <>
      {getView()}
    </>
  )
}



export default FormExample