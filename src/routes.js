import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
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
import Manager from './views/system/manager.vue'
import Role from './views/system/role.vue'

function isHasPermission(codes) {
    let user = sessionStorage.getItem('user');
    let hidden = true;
    if (user) {
        user = JSON.parse(user);

        if (user.roleScope) {
            for (let index = 0; index < codes.length; index ++) {
                let code = codes[index];
                if (user.roleScope.indexOf(code) != -1) {
                    hidden = false;
                    break;
                }
            }
        }
    }
    return hidden;
}

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
        name: '规划管理',
        iconCls: 'el-icon-menu',
        hidden: isHasPermission(["czgl"]),
        children: [
            { path: '/cunzhuang', component: CunZhuang, name: '村庄管理', hidden: isHasPermission(["'czgl_scan'", "'czgl_new'", "'czgl_edit'", "'czgl_delete'"])}
        ]
    },
    {
        path: '/',
        component: Home,
        name: '专题管理',
        iconCls: 'el-icon-picture',
        hidden: isHasPermission(["jdgl", "zjgl", "sfgl", "ykgl"]),
        children: [
            { path: '/jingdian', component: JingDian, name: '景点管理', hidden: isHasPermission(["'jdgl_scan'", "'jdgl_new'", "'jdgl_edit'", "'jdgl_delete'"])},
            { path: '/zongjiao', component: ZongJiao, name: '宗教管理', hidden: isHasPermission(["'zjgl_scan'", "'zjgl_new'", "'zjgl_edit'", "'zjgl_delete'"])},
            { path: '/shanfeng', component: ShanFeng, name: '山峰管理', hidden: isHasPermission(["'sfgl_scan'", "'sfgl_new'", "'sfgl_edit'", "'czgl_delete'"])},
            { path: '/yukou', component: YuKou, name: '峪口管理', hidden: isHasPermission(["'ykgl_scan'", "'ykgl_new'", "'ykgl_edit'", "'ykgl_delete'"])}
        ]
    },
    {
        path: '/',
        component: Home,
        name: '政策管理',
        iconCls: 'el-icon-document',
        hidden: isHasPermission(["fggl"]),
        children: [
            { path: '/fagui', component: FaGui, name: '法规管理', hidden: isHasPermission(["'fggl_scan'", "'fggl_new'", "'fggl_edit'", "'fggl_delete'"])}
        ]
    },
    {
        path: '/',
        component: Home,
        name: '用户管理',
        iconCls: 'el-icon-share',
        hidden: isHasPermission(["appyhgl", "jbgl", "jygl", "jcgl"]),
        children: [
            { path: '/user', component: User, name: 'APP用户管理', hidden: isHasPermission(["'appyhgl_scan'", "'appyhgl_enordis'"])},
            { path: '/jubao', component: JuBao, name: '举报管理', hidden: isHasPermission(["'jbgl_scan'", "'jbgl_handle'", "'jbgl_delete'"])},
            { path: '/jianyi', component: JianYi, name: '建议管理', hidden: isHasPermission(["'jygl_scan'", "'jygl_handle'", "'jygl_delete'"])},
            { path: '/jiucuo', component: JiuCuo, name: '纠错管理', hidden: isHasPermission(["'jcgl_scan'", "'jcgl_handle'", "'jcgl_delete'"])}
        ]
    },
    {
        path: '/',
        component: Home,
        name: '系统管理',
        iconCls: 'el-icon-setting',
        hidden: isHasPermission(["czygl", "jsgl"]),
        children: [
            { path: '/manager', component: Manager, name: '操作员管理', hidden: isHasPermission(["'czygl_scan'", "'czygl_new'", "'czygl_edit'", "'czygl_enordis'", "'czygl_delete'"])},
            { path: '/role', component: Role, name: '角色管理', hidden: isHasPermission(["'jsgl_scan'", "'jsgl_new'", "'jsgl_edit'", "'jsgl_enordis'", "'jsgl_delete'"])}
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;