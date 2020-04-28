import React, {useState} from 'react'
import EmailForm from './EmailForm'
import PasswordForm from './PasswordForm'
import { useHistory } from 'react-router-dom';

const SignInForm = () => {
  const [email, setEmail] = useState('')
  const [display, setDisplay] = useState(1)
  const history = useHistory()
  
  const setEmailCB = (v) => {
    setEmail(v)
    setDisplay(2)
  }

  const setNextCb = () => {
    history.push('/')
  }
  
  const getView = () => {
    if (display === 1) {
      return (<EmailForm 
        setEmailCb={setEmailCB}
      />)
    } else if (display === 2) {
      return (<PasswordForm
        email={email}
        setNextCb={setNextCb}
      />)
    }
  }
  return (
    <>
      {getView()}
    </>
  )
}



export default SignInForm
