import Vue from 'vue'
import Vuex from 'vuex'
import VuexWebExtensions from 'vuex-webextensions';

import * as getters from './getters'
import * as actions from './actions'
import state from './state'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [VuexWebExtensions({
        persistentStates: ['rates', 'created_at', 'updated_at', 'enabledCurrencies', 'displayRateField'],
    })],
    state,
    getters,
    mutations,
    actions
});
