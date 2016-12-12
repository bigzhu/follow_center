import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Main from './components/Main.vue'
import UserNameLogin from './components/UserNameLogin.vue'
import Recommand from './components/Recommand.vue'
import Collect from './components/Collect.vue'
import MyGods from './components/MyGods.vue'
import Bio from './components/Bio.vue'
import BioDetail from './components/BioDetail.vue'
import TheMessage from './components/TheMessage'
import God from './components/God'
import Search from './components/Search'

const routes = [
  { path: '/Search/:key', name: 'Search', component: Search },
  { path: '/', name: 'Main', component: Main },
  { path: '/God/:god_name', name: 'God', component: God },
  { path: '/TheMessage/:id', name: 'TheMessage', component: TheMessage },
  { path: '/BioDetail/:god_name', name: 'BioDetail', component: BioDetail },
  { path: '/Bio', name: 'Bio', component: Bio },
  { path: '/MyGods/:cat', name: 'MyGods', component: MyGods },
  { path: '/Collect', name: 'Collect', component: Collect },
  { path: '/Recommand/:cat*', name: 'Recommand', component: Recommand },
  { path: '/Login', name: 'UserNameLogin', component: UserNameLogin }
]
export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: routes
})
