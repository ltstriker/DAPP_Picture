// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'

import Element from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'
Vue.use(Element)

Vue.prototype.$axios = Axios;  //在Vue的原型上添加$axios方法

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
