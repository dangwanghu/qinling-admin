import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Table from './views/nav1/Table.vue'
import Form from './views/nav1/Form.vue'
import Test from './views/nav2/Test.vue'
import CunZhuang from './views/layout/cunzhuang.vue'
import JingDian from './views/topic/jingdian.vue'
import ShanFeng from './views/topic/shanfeng.vue'
import YuKou from './views/topic/yukou.vue'
import ZongJiao from './views/topic/zongjiao.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '基本示例',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/table', component: Table, name: '表格' },
            { path: '/form', component: Form, name: '表单' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: 'Vuex',
        iconCls: 'el-icon-time',
        children: [
            { path: '/test', component: Test, name: 'Test页面' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '规划管理',
        iconCls: 'el-icon-menu',
        children: [
            { path: '/cunzhuang', component: CunZhuang, name: '村庄管理' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '专题管理',
        iconCls: 'el-icon-picture',
        children: [
            { path: '/jingdian', component: JingDian, name: '景点管理' },
            { path: '/zongjiao', component: ZongJiao, name: '宗教管理' },
            { path: '/shanfeng', component: ShanFeng, name: '山峰管理' },
            { path: '/yukou', component: YuKou, name: '峪口管理' }
        ]
    },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '',
    //     iconCls: 'fa fa-address-card',
    //     leaf: true,
    //     children: [
    //         { path: '/page6', component: Page6, name: '导航三' }
    //     ]
    // },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;