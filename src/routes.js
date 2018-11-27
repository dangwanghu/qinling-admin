import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Form from './views/nav1/Form.vue'
import CunZhuang from './views/layout/cunzhuang.vue'
import JingDian from './views/topic/jingdian.vue'
import ShanFeng from './views/topic/shanfeng.vue'
import YuKou from './views/topic/yukou.vue'
import ZongJiao from './views/topic/zongjiao.vue'
import JianYi from './views/mutual/jianyi.vue'
import JiuCuo from './views/mutual/jiucuo.vue'
import JuBao from './views/mutual/jubao.vue'
import User from './views/mutual/user.vue'
import FaGui from './views/policy/fagui.vue'

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
        iconCls: 'el-icon-message',
        children: [
            { path: '/form', component: Form, name: '表单' }
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
    {
        path: '/',
        component: Home,
        name: '政策管理',
        iconCls: 'el-icon-document',
        children: [
            { path: '/fagui', component: FaGui, name: '法规管理' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '用户管理',
        iconCls: 'el-icon-share',
        children: [
            { path: '/user', component: User, name: 'APP用户管理' },
            { path: '/jubao', component: JuBao, name: '举报管理' },
            { path: '/jianyi', component: JianYi, name: '建议管理' },
            { path: '/jiucuo', component: JiuCuo, name: '纠错管理' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '系统管理',
        iconCls: 'el-icon-setting',
        children: [
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;