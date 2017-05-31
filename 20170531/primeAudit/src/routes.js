// import Login from './pages/Login.vue'
// import Home from './pages/Home.vue'
// import Main from './pages/Main.vue'
// import Table from './pages/nav1/Table.vue'
// import Form from './pages/nav1/Form.vue'
// import user from './pages/nav1/user.vue'
// import highcharts from './pages/charts/highcharts.vue'
// import Peity from './pages/charts/Peity.vue'
// import Dashboard from './pages/dashboard/dashboard.vue'
// import Equip from './pages/equip/Table.vue'
// import datatable from './pages/nav1/datatable.vue'
// import MultiSelect from './pages/charts/MultiSelect.vue'
// import Topiclist from './pages/topic/topiclist.vue'
// import Viewtopic from './pages/topic/viewtopic.vue'

import NotFound from './pages/404.vue'
import Page4 from './pages/nav2/Page4.vue'
import Page5 from './pages/nav2/Page5.vue'
import Audit from './pages/Audit/Audit.vue'
import Archive from './pages/Archive/Archive.vue'
import Axios from './pages/nav2/Axios.vue'
import Page6 from './pages/nav3/Page6.vue'
import echarts from './pages/charts/echarts.vue'
import System from './pages/System/System.vue'
import SystemLog from './pages/System/SystemLog.vue'
import SystemBasic from './pages/System/SystemBasic.vue'
import SystemRole from './pages/System/SystemRole.vue'
import SystemDict from './pages/System/SystemDict.vue'
import Index from './pages/Index/Index.vue'
import Customer from './pages/Customer/customer.vue'

let routes = [
/*
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
*/
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
	 {
        path: '/index',
        alias: '/',
        component: Index,
        name: '首页',
        iconCls: 'fa fa-gear',
        leaf: true,
    },
    {
         path: '/Customer',
         component: Customer,
         name: '客户管理',
         iconCls: 'fa fa-gear',
         leaf: true,
     },{
          path: '/page4',
          component: Page4,
          name: '项目管理',
          iconCls: 'fa fa-gear',
          leaf: true,
      },{
           path: '/audit',
           component: Audit,
           name: '被设计单位管理',
           iconCls: 'fa fa-gear',
           leaf: true,
       },{
            path: '/archive',
            component: Archive,
            name: '归档管理',
            iconCls: 'fa fa-gear',
            leaf: true,
        },
        {
             path: '/system',
             component: System,
             name: '系统管理',
             iconCls: 'fa fa-gear',
             leaf: true,
             children: [
                 { path: '/system/log', ViewPath: '/#/system/log', component: SystemLog, name: '系统日志' },
                 { path: '/system/basic', ViewPath: '/#/system/basic', component: SystemBasic, name: '基础信息' },
                 { path: '/system/role', ViewPath: '/#/system/role', component: SystemRole, name: '角色管理' },
                 { path: '/system/dict', ViewPath: '/#/system/dict', component: SystemDict, name: '字典项' }
             ]
         },
/*
	{
        path: '/',
        component: Home,
        name: '查看专题',
        iconCls: 'fa fa-dashboard fa-fw',
        leaf: true,
		children: [
            { path: '/viewtopic', component: Viewtopic, name: '查看专题' }
        ]
    },

    //{ path: '/main', component: Main },
	{
        path: '/',
        component: Home,
        name: '概览',
        iconCls: 'fa fa-dashboard fa-fw',
        leaf: true,
		children: [
            { path: '/dashboard', component: Dashboard, name: '系统概览' }
        ]
    },
	{
        path: '/',
        component: Home,
        name: '表单样式',
        iconCls: 'fa fa-bar-chart-o fa-fw',//图标样式class
        children: [
            { path: '/table', component: Table, name: 'Table' },
            { path: '/form', component: Form, name: 'Form' },
            { path: '/user', component: user, name: '列表'},
			{ path: '/datatable', component: datatable, name: 'dataTable'},
			{ path: '/Page6', component: Page6, name: 'Page6'},
        ]
    },
    {
        path: '/',
        component: Home,
        name: '空调系统',
        iconCls: 'fa fa-bar-chart-o fa-fw',//图标样式class
        children: [
            { path: '/main', component: Main, name: '风机运行状态'},
			{ path: '/main', component: Main, name: '冷热源状态'},
			{ path: '/main', component: Main, name: '供回水准状态'},
			{ path: '/main', component: Main, name: '室外气象条件'},
            { path: '/table', component: Table, name: 'Table' ,hidden: true },
            { path: '/form', component: Form, name: 'Form' ,hidden: true},
            { path: '/user', component: user, name: '列表' ,hidden: true},
        ]
    },
    {
        path: '/',
        component: Home,
        name: '能耗评估',
        iconCls: 'fa fa-table fa-fw',
        children: [
            { path: '/page4', component: Page4, name: '电气系统能耗统计' },
            { path: '/page5', component: Page5, name: '空调系统能耗统计' },
            { path: '/page5', component: Page5, name: '风冷热泵系统能耗统计' },
            { path: '/page5', component: Page5, name: '室外气象条件' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '空调基础系统录入',
        iconCls: 'fa fa-wrench fa-fw',
        children: [
            { path: '/equip', component: Equip, name: '初效过滤' },
            { path: '/echarts', component: echarts, name: '中效过滤' },
            { path: '/echarts', component: echarts, name: '亚高效过滤器' },
            { path: '/echarts', component: echarts, name: '高效过滤' },
            { path: '/echarts', component: echarts, name: '活性炭过滤' },
            { path: '/echarts', component: echarts, name: '字典过滤' },
            { path: '/MultiSelect', component: MultiSelect, name: '多选下拉菜单' },
            { path: '/echarts', component: echarts, name: '空气处理机组录入表' },
            { path: '/echarts', component: echarts, name: '空气处理机组(用户界面)' },
            { path: '/echarts', component: echarts, name: '排风扇录入机' },
            { path: '/echarts', component: echarts, name: '排风扇录机组(用户界面)' },


            { path: '/echarts', component: echarts, name: 'echarts',hidden:true },
			{ path: '/highcharts', component: highcharts, name: 'highcharts',hidden:true },
			{ path: '/Peity', component: Peity, name: 'Peity',hidden:true }
        ]
    },
	{
        path: '/',
        component: Home,
        name: '空调系统后台监测',
        iconCls: 'fa fa-sitemap fa-fw',
        children: [
            { path: '/echarts', component: echarts, name: '送风机累计运行时间' },
            { path: '/echarts', component: echarts, name: '排风机累计运行时间' },
			]
	},
*/
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;
