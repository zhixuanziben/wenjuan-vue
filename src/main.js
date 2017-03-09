// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App'
import VueRouter from "vue-router"
import userMain from "./components/userMain"
import editPage from './components/editPage'
import createNewpage from './components/createNewpage'

Vue.use(VueRouter)
Vue.use(ElementUI)
/* eslint-disable no-new */
const routes = [
  { path: '/second', component: userMain },
  { path: '/createNewpage', component: createNewpage},
  { path: '/editPage', component: editPage },
  { path: '/editPage/:id', component: editPage }
]
const router = new VueRouter({
  routes: routes // （缩写）相当于 routes: routes
})

// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
const app = new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app')