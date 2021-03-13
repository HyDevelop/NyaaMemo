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
    plugins: [vuexLocal.plugin]
})

export default store

/**
 * For some reason IntelliJ wouldn't autocomplete if I just typed store.state,
 * so I'll have to encapsulate it here and specify the type.
 */
export function getLocal(): LocalData
{
    return store.state as LocalData
}
