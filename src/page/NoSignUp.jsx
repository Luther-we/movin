import React from 'react'
import { withAuth } from '../utils/auth/withAuth'

const C = () => {
  return (
  <>
    Vous êtes maintenant bien loggué
  </>)
}

const Contenu = withAuth(C)

export default Contenu