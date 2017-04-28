#第一章，Vue介绍
- BAT都在使用
- 轻量级
- 高效率
- 上手快
- 简单易学
- 文档全面而简洁

Vue.js SPA = Single Page Application 
- 模板渲染
- 模块化
- 扩展功能
  - 路由
  - Ajax

Vue.js基础
- 模板渲染
- 条件渲染
- 组件交互
- 标签属性
- 事件绑定
- 计算属性
- 属性监听
- 表单
- 动画
- vue-cli项目搭建
- vue-router路由
- vuex

前置知识
- Node以及NPM操作
- Html,css,js基础
- ES6语法基础

实例-->组件-->指令-->选项-->模板渲染-->事件绑定-->计算属性-->内置动画-->组件交互-->路由

#第2章 Vue简介
轻量级的前端界面库， Vue本身是模板渲染库
2016.10发布最新2.0版本，更强大，更丰富

- 数据渲染/数据同步(JS数据如何渲染到HTML页面)
- 组件化/模块化
- 其他功能：路由，ajax, 数据流

```
模板渲染
<div id="app">
  {{ message }}
</div>

var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})
```

```
组件
<div id="example">
  <my-component></my-component>
</div>

// register
Vue.component('my-component', {
  template: '<div>A custom component!</div>'
})
// create a root instance
new Vue({
  el: '#example'
})
```

Vue.js学习资源
- vuejs中文官网 - http://cn.vuejs.org/
- vuejs源码 - https://github.com/vuejs/vue
- vuejs官方工具 - https://github.com/vuejs
- vuejs官方论坛 - https://forum.vuejs.org
- vuejs浏览器插件
- Eleme团队的Element前端组件
- IView前端组件
- AwesomeVue - https://github.com/vuejs/awesome-vue

###2.1 vuejs有哪些特点
响应式 -- 双向绑定
双向绑定的意义？
传统的前端，HTML和JS会进行很多的交互，当这些交互变的复杂起来之后会变得非常难以控制，如果规划不好，会非常难以维护
前端框架就能很好的解决问题，把常用的操作进行一些抽象，使用框架的一些功能和属性，对象，进行数据的展现，功能的一些交互

双向绑定就是JS层面的数据改变，会引发页面的数据改变
反过来页面中的元素更改，JS里面的数据也会更改

```
<div id="app">
  {{ message }} //模板渲染
</div>

var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!' //值
  }
})
```

组件化 - 模块化
页面当中一般可以抽象出来一些组件：
- header
- login
- pagenation
- footer
- slideshow

将这些组件分别放到不同的页面，使得页面的扩展非常容易灵活，组件之间也实现了解耦

单文件组件 - js,css,html存在于一个文件中
(Webpack + vue-loader) 将.vue的文件解析为浏览器能执行的文件
(Browserify + vueify)

template里面可以定义lang=jade
css里面可以定义scoped
可以定义lang='less'
可以很方便的使用各种预处理器

###Vue实例化对象
```
vue实例对象
new Vue({//构造函数
  el: '#app',//构造参数
  template: '<div>{{fruit}}</div>',
  data: {//参数选项
    message: 'Hello vue.js',
    fruit: 'apple'
  }
})

new Vue({
    el: 'body',
    components: { App } //子组件,一层一层树状结构
})
```

实例的生命周期
http://vuejs.org/v2/guide/instance.html

查看介绍的demo, 01
查看vue实例的demo, 02

###第3章
···
{{ number + 1 }}
{{ ok ? 'YES' : 'NO' }}
{{ message.split('').reverse().join('') }}
<div v-bind:id="'list-' + id"></div>
···

###vue基本概念
- 全局API
- 实例选项
- 实例属性/方法
- 指令
- 内置组件

###2.2命令行脚手架安装
准备好C盘至少还有3G空间
- npm config set loglevel=http
- npm i -g cnpm --registry=https://registry.npm.taobao.org
- cnpm i -g vue-cli
- vue init webpack vue1
- cd vue1
- cnpm install
- cnpm run dev

npm i -g vue-cli && vue init webpack vue1 && cd vue1 && npm install && npm run dev