import { RedirectErrorTo } from './routesUtils'
import Contenu from '../../page/NoSignUp'

const subRoutesHome = [
  {
    path: 'home/contenu',
    exact: true,
    component: Contenu
  },
  {
    path: '/home/*',
    component: RedirectErrorTo,
  }
]

export default subRoutesHome