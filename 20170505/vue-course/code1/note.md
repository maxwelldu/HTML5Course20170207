#一.vue介绍
- 渐进式框架Vue
- Vue中两个核心点
- 虚拟DOM
- MVVM模式
- Vue实例
- 声明式渲染
- 指令
- 模板

##简介Vue.js
###Vue是什么
构建用户界面的渐进式框架
只关注视图层(View)

声明式渲染 Declarative Rendering
|
v
组件系统 Component System
|
v
客户端路由 Client-Side Routing
|
v
大规模状态管理 Large Scale State Management
|
v
构建工具 Build System

##Vue中两个核心点
###响应的数据绑定
当数据发生改变-->自动更新视图
利用Object.definedProperty中的setter/getter代理数据，监控对数据的操作
###组合的视图组件
- UI页面映射为组件树 ElementUI
- 划分组件可维护、可重用、可测试

##虚拟DOM
###虚拟DOM(Virtual DOM)
运行js的速度是很快的，大量的操作DOM就会很慢。时常在更新数据后会重新渲染页面，这样造成在没有改变数据的地方也重新渲染了DOM节点，这样就造成了很大程度上的资源浪费。
利用在内存中的生成与真实DOM与之对象的数据结构，这个在内存中生成的结构称之为虚拟DOM。
当数据发生变化时，能够智能地计算出重新渲染组件的最小代价并应用到DOM操作上。

##MVVM模式
M： Model 数据模型
V： View 视图模板
vm： view-Model 视图模型

##渐进式学习提纲
###基础语法
Vue实例 模板语法
计算属性 class和style绑定
条件和列表渲染 事件处理器
表单控件绑定 组件
###高级进阶
vue插件编写 mixin混合
过渡效果 自定义指令
vue-router:路由系统的使用 vuex:状态管理器
###构建工具
nodejs:javascript运行环境 webpack:模块管理和打包工具
vue-cli:脚手架配置

##Vue实例
###Vue实例
每一个应用都是通过Vue这个构造函数创建根实例（root instance)启动
    new Vue(选项对象)
需要传入选项对象，对象包含挂载元素，数据，模板，方法等
    el:挂载元素选择器  String|HtmlElement
    data:代理数据   Object|Function
    methods:定义方法 Object
###Vue 代理data数据
每个vue实例都会代理其data对象里所有的属性，这些被代理的属性是响应的，新添加的属性不具备响应功能，改变后不会更新视图
###vue实例自身属性和方法
暴露自身的属性和方法，以$开头，例如：$el, $data...

##声明式渲染
###声明式
只需要声明在哪里(where)做什么（what),而无需关心如何实现(how)
###命令式
需要以具体代码表达在哪里(where)做什么(what),如何实现（how)
例子：求数组中每一项的倍数
    命令式
        使用for循环拿出每一项，然后求值完成后，再放入另一数组中
    声明式
        使用map方法，关注如何求值
###vue声明式渲染
初始化根实例，vue自动将数据绑定在DOM模板上

##指令
###什么是指令
是一种特殊的自定义行间属性
指令的职责就是当其表达式的值改变时相应地将某些行为应用到DOM上
在Vue中，指令以v-开头

##内置指令
###Vue中的内置指令
v-bind 动态的绑定数据。简写为：     v-on 绑定事件监听器。简写为@
v-text 更新数据，会覆盖已有结构     v-html 可以解析数据中的html结构
v-show 根据值的真假，切换元素的display属性  v-if 根据值的真假，切换元素会被销毁，重建
v-else-if 多条件判断，为真则渲染   v-else 条件都不符合渲染
v-for 基于源数据多次渲染元素或模板块  v-model 在表单控件元素上创建双向数据绑定
v-pre 跳过元素和子元素的编译过程   v-once 只渲染一次，随后数据更新不重新渲染
v-cloak 隐藏未编译的Mustache语法，css中设置[]v-cloak]{display:none}

##HTML模板
###HTML模板
基于DOM的模板，模板都是可解析的有效的HTML
###插值
文本：使用"Mustache"语法（双大括号){{value}}
    作用：替换实例上的属性值，当值改变时，插值内容处会自动更新
原生的html: 双大括号输出的是文本，不会解析html
属性：使用v-bind进行绑定，可以响应变化
使用javascript表达式：写简单的表达式

##字符串模板
###template字符串
template选项对象的属性
模板将会替换挂载的元素，挂载元素的内容都会被忽略
根节点只能有一个
将html结构写在一对script标签中，设置type="x-template"

##模板-render函数
###render函数
render 选项对象的属性
createElement(标签名,[数据对象],子元素)；
子元素为文本或数组

###数据对象属性
class:{}, //绑定class, 和v-bind:class一样的API
style:{}, //绑定样式，和v-bind:style一样的API
attrs:{}, //添加行间属性
domProps:{}, //DOM元素属性
on:{}   //绑定事件

nativeOn:{}, //监听原生事件
directives:{} //自定义指令
scopedSlots:{}, //slot作用域
slot:{}, //定义slot名称
key:"key", //给元素添加唯一标识
ref:"ref" //引用信息

