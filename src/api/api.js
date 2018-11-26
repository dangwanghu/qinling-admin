import * as CunZhuangApi from './cunzhuang.api';
import * as ZongJiaoApi from './zongjiao.api';
import * as JianDianApi from './jingdian.api';
import * as ShanFengApi from './shanfeng.api';
import * as YukouApi from './yukou.api';
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
    }
}