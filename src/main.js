import Vue from 'vue'
import App from './App.vue'
import router from './router/defaultRoutes'
import store from './store'
import ElementUI from 'element-ui'
import VCharts from 'v-charts'
import 'element-ui/lib/theme-chalk/index.css'
import * as filters from './filters'
import * as directives from './directives'
import Message from '@/components/m-message/message'
Vue.config.productionTip = false
// 注册过滤器
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));
// 注册指令
Object.keys(directives).forEach(k => Vue.directive(k, directives[k]));

Vue.use(ElementUI)
Vue.use(VCharts)
Vue.use(Message)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
