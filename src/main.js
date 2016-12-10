import Vue from 'vue'
// import VueRouter from 'vue-router'
// import VueI18n from 'vue-i18n'
// Vue.use(VueI18n)
// set lang
// var lang = window.localStorage.getItem('lang') || 'th'
// Vue.config.lang = lang
// // set locales
// import locales from './locales'
// Object.keys(locales).forEach(function (lang) {
//   Vue.locale(lang, locales[lang])
// })
import router from './router'

import {checkLogin} from '../../lib_bz/functions/user'
import fastclick from 'fastclick'
import App from './App.vue'

router.beforeEach((to, from, next) => {
  // check is login?
  console.log(to)
  if (!checkLogin() && to.path !== '/Login' && to.name !== 'TheMessage') {
    window.location.href = '/login.html'
    // next('/Login')
    return
  }
  next()
})

App.router = router
let instance = new Vue(App).$mount('#app')

fastclick.attach(document.body)

import {initErrorHandle} from '../../lib_bz/functions/error'
//  toastr show error
initErrorHandle()
export default {
  instance
}
