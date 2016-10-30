import Vue from 'vue'
Vue.config.debug = true
import VueRouter from 'vue-router'
// Vue.use(VueRouter)
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
// set lang
var lang = window.localStorage.getItem('lang') || 'th'
Vue.config.lang = lang
// set locales
import locales from './locales'
Object.keys(locales).forEach(function (lang) {
  Vue.locale(lang, locales[lang])
})

import {checkLogin} from '../../lib_bz/functions/user'
import fastclick from 'fastclick'
import App from './App'
// import Main from './components/Main'

const routes = [
  // { path: '/', name: 'Main', component: Main }
]

const router = new VueRouter(
  {
    mode: 'history',
    routes: routes
  }
)

router.beforeEach((to, from, next) => {
  // check is login?
  if (!checkLogin() && to.path !== '/Login') {
    next('/Login')
    return
  }
  next()
})

App.router = router
new Vue(App).$mount('#app')

fastclick.attach(document.body)
