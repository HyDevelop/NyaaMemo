import {createStore, Store} from 'vuex'
import VuexPersistence from "vuex-persist";
import {LocalData} from "@/logic/models";

/**
 * Vuex automated persistence using localStorage
 */
const vuexLocal = new VuexPersistence<LocalData>({
    storage: window.localStorage
})

/**
 * Create vuex store
 */
const store = createStore<LocalData>({
    state: {
        loggedIn: false,
        longTermWords: []
    },
    mutations: {
        _addWord(state: LocalData, w: string)
        {
            state.longTermWords.push({dayLog: [], word: w})
        }
    },
    actions: {},
    modules: {},
    plugins: [vuexLocal.plugin]
})

export default store

/**
 * Why is vuex so unnecessarily complicated ;-;
 */
class StateUtils
{
    store: Store<LocalData>

    constructor(store: Store<LocalData>)
    {
        this.store = store
    }

    /**
     * Check if a word is already added to the long-term storage list.
     */
    hasWord(w: string): boolean
    {
        w = w.toLowerCase()
        return this.state.longTermWords.some(it => it.word.toLowerCase() == w)
    }

    /**
     * Getters for the original state
     */
    get state() { return this.store.state as LocalData }
    get loggedIn() { return this.state.loggedIn }
    get longTermWords() { return this.state.longTermWords }
}

/**
 * For some reason IntelliJ wouldn't autocomplete if I just typed store.state,
 * so I'll have to encapsulate it here and specify the type.
 */
export function local(): StateUtils
{
    return new StateUtils(store)
}
