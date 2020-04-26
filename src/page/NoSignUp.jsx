import React from 'react'
import {Link} from 'react-router-dom'
import {Button} from 'react-bootstrap'

const Contenu = () => {
  return (
  <>
    Pour voir le contenu, il faut être loggué.
    <Button variant="outline-primary"><Link to={'/home/login'}>Se connecter</Link></Button>{' '}
    
  </>)
}

export default Contenu