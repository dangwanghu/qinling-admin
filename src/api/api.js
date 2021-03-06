import * as CunZhuangApi from './cunzhuang.api';
import * as ZongJiaoApi from './zongjiao.api';
import * as JianDianApi from './jingdian.api';
import * as ShanFengApi from './shanfeng.api';
import * as YukouApi from './yukou.api';
import * as DictApi from './dict.api';
import * as ManagerApi from './manager.api';
import * as RoleApi from './role.api';
import * as UserApi from './user.api';
import * as JianYiApi from './jianyi.api';
import * as JuBaoApi from './jubao.api';
import * as JiuCuoApi from './jiucuo.api';
import * as FaGuiApi from './fagui.api';
import * as Constants from '../common/constants';

export default function getApi(name) {
    switch (name) {
        case Constants.CUNZHUANG:
            return CunZhuangApi;
        case Constants.YUKOU:
            return YukouApi;
        case Constants.SHANFENG:
            return ShanFengApi;
        case Constants.JINGDIAN:
            return JianDianApi;
        case Constants.ZONGJIAO:
            return ZongJiaoApi;
        case Constants.DICT:
            return DictApi;
        case Constants.MANAGER:
            return ManagerApi;
        case Constants.ROLE:
            return RoleApi;
        case Constants.USER:
            return UserApi;
        case Constants.FAGUI:
            return FaGuiApi;
        case Constants.JIANYI:
            return JianYiApi;
        case Constants.JUBAO:
            return JuBaoApi;
        case Constants.JIUCUO   :
            return JiuCuoApi;
    }
}