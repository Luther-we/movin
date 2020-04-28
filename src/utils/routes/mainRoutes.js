import Home from '../../page/Home'
import Start from '../../page/Start'
import { Error404 } from '../../page/Errors'
import Log from '../../page/Log'

const routes = [
  {
    path: '/',
    exact: true,
    component: Start,
  },
  {
    path:'/home',
    component: Home,
  },
  {
    path:'/log',
    component: Log
  },
  {
    path: '*',
    component: Error404
  }
]

export default routes