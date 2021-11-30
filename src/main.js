// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueAxios from 'vue-axios'
import axios from 'axios'

import 'vue-easytable/libs/theme-default/index.css'
import VueEasytable from 'vue-easytable'
import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.min'
// import {VueEasytable, VeTable, VePagination, VeIcon, VeLoading, VeLocale} from 'vue-easytable'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(VueEasytable)
// Vue.use(VeTable)
// Vue.use(VePagination)
// Vue.use(VeIcon)
// Vue.use(VeLoading)
// Vue.use(VeLocale)
// Vue.prototype.$veLoading = VeLoading
// Vue.prototype.$veLocale = VeLocale
axios.defaults.baseURL = '/apis'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
