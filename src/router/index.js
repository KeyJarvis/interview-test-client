import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../pages/home.vue')
    },
    {
      path: '/new-task',
      name: 'new-task',
      component: () => import('../pages/newTask.vue')
    },
    {
      path: '/modify-task',
      name: 'modify-task',
      component: () => import('../pages/modifyTask.vue')
    }
  ]
})
