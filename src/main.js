import Vue from 'vue'
import App from './App.vue'

import router from './router/router'
import store from './store/store'
// import './plugins/element.js'

// 导入element
import './plugins/element.js'

Vue.config.productionTip = false

// Vue.use(router)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
