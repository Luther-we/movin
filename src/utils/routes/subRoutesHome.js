import { RedirectErrorTo } from './routesUtils'
import Login from '../../page/Login'
import Contenu from '../../page/NoSignUp'

const subRoutesHome = [
  {
    path: '/home/login',
    exact: true,
    component: Login
  },
  {
    path: '/home/',
    exact: true,
    component: Contenu
  },
  {
    path: '/home/*',
    component: RedirectErrorTo,
  }
]

export default subRoutesHome