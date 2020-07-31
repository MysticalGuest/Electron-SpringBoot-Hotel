import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login.vue'
import Front from '../views/Front/HomeOfFront.vue'
import Guest from '../views/Front/Guest.vue'
import Print from '../views/Front/Print.vue'
import Apartment from '../views/Front/Apartment.vue'
import Account from '../views/Front/Account.vue'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/front',
    name: 'Front',
    component: Front
  },
  {
    path: '/front/guest',
    name: 'guest',
    component: Guest
  },
  {
    path: '/front/print',
    name: 'print',
    component: Print
  },
  {
    path: '/front/apartment',
    name: 'apartment',
    component: Apartment
  },
  {
    path: '/front/account',
    name: 'account',
    component: Account
  }
]

const router = new VueRouter({
  routes
})

export default router
