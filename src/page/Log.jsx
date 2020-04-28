import React from 'react'
import SignInForm from './SignInForm'
import Login from './Login'
import { Card, Button } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { CreateRoutes } from '../utils/routes/routesUtils'

const Log = () => {
  return (
    <>
    
    <Card>
  <Card.Header as="h5">Featured</Card.Header>
  <Card.Body>
  <CreateRoutes routes={subRoutesLog} />
  </Card.Body>
  
</Card>

    </>
  )
}

const WelcomeLogin = () => {
  return (<>
  <Card.Body>
  <Card.Title>S'identifier'</Card.Title>
  <Card.Text>
    Pour accèder, il vous faut être connecté
  </Card.Text>
  
  <Button variant="outline-primary"><Link to='/log/signin'>Créer un compte</Link></Button>
  
  <Button variant="outline-primary"><Link to='/log/login'>Se connecter</Link></Button>
  </Card.Body>
  </>)
  }

export default Log

const subRoutesLog = [
  {
    path: '/log/',
    component: WelcomeLogin,
    exact: true
  },
  {
    path: '/log/login',
    component: Login
  },
  {
    path: '/log/signin',
    component: SignInForm
  }
]

