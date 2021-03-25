import { RouteRecordRaw } from 'vue-router'
import ContainerLayout from '../pages/_container.vue'

const children: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'root',
    component: () => import('../pages/home.vue')
  }
]

export default {
  path: '/',
  component: ContainerLayout,
  children: children
}
