import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入Element-UI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'jquery'

Vue.config.productionTip = false
Vue.use(ElementUI);
// Vue.use($);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
