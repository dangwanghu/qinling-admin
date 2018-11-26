import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import cunzhuang from './modules/cunzhuang.vuex'
import jingdian from './modules/jingdian.vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        cunzhuang,
        jingdian
    },
    getters
})