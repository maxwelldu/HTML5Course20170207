import babelpolyfill from 'babel-polyfill'//数据方法兼容补丁
import Vue from 'vue'//引入框架
import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './App'//程序主要入口
import ElementUI from 'element-ui'//引入element-ui框架
import 'element-ui/lib/theme-default/index.css'//引入element-ui样式表
import VueRouter from 'vue-router'//vue路由组件
import store from './vuex/index' //引入vuex
import Vuex from 'vuex'//集中式存储管理应用的所有组件的状态
import NProgress from 'nprogress'//进度条组件
import 'nprogress/nprogress.css'//进度条样式
import routes from './routes'//引入routes.js文件里面控制路由
//import Mock from './mock'//模拟异步请求数据前后端进行分离
import Metismenu from 'metismenu'
import $ from 'jquery'
// import 'DataTables/css/jquery.dataTables.css'//引入datatable样式表
//import 'bootstrap/dist/js/bootstrap.min.js'
// import VeeValidate from 'vee-validate' //引入表单验证
//import bootstrapValidator from 'sbAdmin/js/jquery.validate.js'
// Vue.use(VeeValidate);//全局引用
Vue.prototype.$http = axios
Vue.use(VueAxios, axios)
Vue.config.devtools = true
//Mock.bootstrap();


Vue.use(ElementUI)//加载elementUI
Vue.use(VueRouter)//加载路由中间件
Vue.use(Vuex)
Vue.use(Metismenu)

NProgress.configure({ showSpinner: false });

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {//每次路由之前都要执行
/*
  console.log('mainJS.'+to.path);
  if (to.path == '/login') {//如果目标是登录
    	sessionStorage.removeItem('user');//清除session
  }
  let user = JSON.parse(sessionStorage.getItem('user'));//从session中获得user信息
  if (!user && to.path != '/login') {//如果用户没有登录
    	next({ path: '/login' })
  } else {
    	next()//进行直接投递
  }
  */
  console.log('From mainJS.'+from.path);
  console.log('To mainJS.'+to.path);
  if(to.path == '/')
  {
    next({ path: '/Index'})
  }
  next()//进行直接投递
})

//router.afterEach(transition => {//路由结束
//	NProgress.done();
//});

new Vue({
  //el: '#app',
  //template: '<App/>',
  router,
  store,
  //components: { App }
  render: h => h(App)
}).$mount('#app')

Vue.filter('maxlength', (str, len, tail) => {
    if (str === undefined) { return; }
    var _str = str + '';
    if (_str.length > len) {
        _str = _str.substr(0, len) + (tail ? tail : '');
    }
    return _str;
})
