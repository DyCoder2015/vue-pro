import Vue from 'vue'
import App from './App.vue'
import 'lib-flexible'
import store from './store'
import router from './router'
import './permission'
import wx from "weixin-jsapi"
// import Confirm from './components/Confirm'
// 第三方组件引入
import Vant from 'vant'
import { Icon } from 'vant';
import 'vant/lib/index.css'
import {Confirm} from 'vue-dialog-simple'
// import Mui from 'vue-awesome-mui'
// import 'vue-awesome-mui/mui/dist/css/mui.css'
// mount with global
Vue.use(Vant)
Vue.use(Icon);
Vue.use(Confirm)
Vue.prototype.wx = wx
// Vue.use(Mui)
Vue.config.productionTip = true
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
