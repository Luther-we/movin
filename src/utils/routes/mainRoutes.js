import Home from '../../page/Home'
import FormExample from '../../page/Test'
import Start from '../../page/Start'
import { Error404 } from '../../page/Errors'

const routes = [
  {
    path: '/',
    exact: true,
    component: Start,
  },
  {
    path:'/home',
    component: FormExample,
  },
  {
    path: '*',
    component: Error404
  }
]

export default routes