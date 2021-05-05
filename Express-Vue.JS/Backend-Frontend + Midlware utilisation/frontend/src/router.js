import Vue from 'vue'
import Router from 'vue-router'
import ListAccounts from './views/ListAccounts.vue'
import signUp from './views/signUp.vue'
import ViewAccount from './views/ViewAccount.vue'
import viewItem from './views/viewItem.vue'
import viewItems from './views/viewItems.vue'
import createItem from './views/createItem.vue'
import Login from './views/Login.vue'
import signOut from './views/signOut.vue'
import DeleteItem from './views/DeleteItem.vue'
import UpdateItem from './views/UpdateItem.vue'
import PersonalItems from './views/PersonalItems.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ListAccounts',
      component: ListAccounts
    },
    {
      path: '/signUp',
      name: 'signUp',
      component: signUp
    },
    {
      path: '/UpdateItem/:id',
      name: 'UpdateItem',
      component: UpdateItem
    },
    {
      path: '/viewAccount/:id',
      name: 'viewAccount',
      component: ViewAccount
    },
    {
      path: '/viewItem/:id',
      name: 'viewItem',
      component: viewItem
    },
    {
      path: '/DeleteItem/:id',
      name: 'DeleteItem',
      component: DeleteItem
    },
    {
    path: '/PersonalItems',
    name: 'PersonalItems',
    component: PersonalItems
    },
    {
      path: '/viewItems',
      name: 'viewItems',
      component: viewItems
    },
    {
    path: '/login',
    name: 'Login',
    component: Login
    },
    {
      path: '/createItem',
      name: 'createItem',
      component: createItem
    },
    {
      path: '/signOut',
      name: 'signOut',
      component: signOut
    }
  ]
})