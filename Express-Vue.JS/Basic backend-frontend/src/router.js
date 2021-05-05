import Vue from 'vue'
import Router from 'vue-router'
import ListAccounts from './views/ListAccounts.vue'
import CreateHuman from './views/CreateHuman.vue'
import ViewAccount from './views/ViewAccount.vue'
import viewActivity from './views/viewActivity.vue'
import viewActivities from './views/viewActivities.vue'
import createActivity from './views/createActivity.vue'
import Login from './views/Login.vue'
import signOut from './views/signOut.vue'
import DeleteActivity from './views/DeleteActivity.vue'
import UpdateActivity from './views/UpdateActivity.vue'
import PersonalActivities from './views/PersonalActivities.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ListAccounts',
      component: ListAccounts
    },
    {
      path: '/createHuman',
      name: 'createHuman',
      component: CreateHuman
    },
    {
      path: '/UpdateActivity/:id',
      name: 'UpdateActivity',
      component: UpdateActivity
    },
    {
      path: '/viewAccount/:id',
      name: 'viewAccount',
      component: ViewAccount
    },
    {
      path: '/viewActivity/:id',
      name: 'viewActivity',
      component: viewActivity
    },
    {
      path: '/DeleteActivity/:id',
      name: 'DeleteActivity',
      component: DeleteActivity
    },
    {
    path: '/PersonalActivities',
    name: 'PersonalActivities',
    component: PersonalActivities
    },
    {
      path: '/viewActivities',
      name: 'viewActivities',
      component: viewActivities
    },
    {
    path: '/login',
    name: 'Login',
    component: Login
    },
    {
      path: '/createActivity',
      name: 'createActivity',
      component: createActivity
    },
    {
      path: '/signOut',
      name: 'signOut',
      component: signOut
    }
  ]
})