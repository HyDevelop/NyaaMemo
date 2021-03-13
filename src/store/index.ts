import {createStore} from 'vuex'
import VuexPersistence from "vuex-persist";
import {LocalData} from "@/logic/models";

const vuexLocal = new VuexPersistence<LocalData>({
    storage: window.localStorage
})

const store = createStore<LocalData>({
    state: {
        loggedIn: false,
        longTermWords: []
    },
    mutations: {},
    actions: {},
    modules: {},
    getters: {
        getLongTermWords(state) { return state.longTermWords }
    },
    plugins: [vuexLocal.plugin]
})

export default store
