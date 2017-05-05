#列表渲染
- v-for指令
    根据一组数组的选项列表进行渲染
    语法：
        value,key in items
        value,key of items
- 变异方法
    vue提供一组方法，对数组进行操作的时候，会触发视图更新
    push() pop() shift() unshift()
    splice() sort() reverse()
   
#事件处理器
- v-on   指令 
    用来监听DOM事件触发代码
    语法：
        v-on:eventName="eventHandle"
    指令简写：
        @
    事件处理函数
        写在methods中统一管理
    事件对象
        在事件处理函数中获取
        内联事件处理函数执行，传入事件对象
            $event
            
#事件修饰符
    事件处理函数只有纯粹的逻辑判断，不处理DOM事件的细节
    例如：阻止冒泡、取消默认行为、判断按键
    
    修饰符的位置：
        v-on:eventName.修饰符
    修饰符：
        .stop .prevent .capture .self .once
    按键修饰符：
        .enter .tab .delete .esc
        .space .up .down .left .right
        .ctrl .alt .shift .meta
        .键值
        
        
#条件渲染
- v-show指令
    根据表达式的值，用来显示/隐藏元素
    语法：
        v-show="表达式"
    元素会被渲染在页面中，只根据表达式的值进行css切换
#动态class
- 动态绑定class
    class也为元素的忏悔，可以使用v-bind:class
    语法：
        :class="{className:表达式}"
            表达式为true添加className
            表达式为false不添加className
        :class = "[className, classname]"    
#自定义指令
- 自定义指令
    除了vue内置的指令，可以自己设置指令
    选项对象的directives属性
    {
        directives:{}
    }
    钩子函数：
        update被绑定元素所在的模板更新时调用
        钩子函数中参数：
            el:指令所绑定的元素，可以用来直接操作DOM
            binding: 一个对象
            value: 指令的绑定值
#计算属性
- 为什么要使用计算属性
    模板是为了描述视图的结构，模板中放入太多逻辑，导致模板过重且难以维护。
    在计算一个计算属性时，Vue.js更新它的依赖列表并缓存结果，只有当其中一个依赖发生了变化，缓存的结果才无效。
    语法：
    在选项对象中
    {
    ...
    computed:{}
    }
