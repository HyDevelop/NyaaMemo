import {createStore} from 'vuex'
import VuexPersistence from "vuex-persist";
import {LocalData} from "@/logic/models";

/**
 * Check if a word is already added to the long-term storage list.
 */
export function hasWord(state: LocalData, w: string): boolean
{
    w = w.toLowerCase()
    return state.longTermWords.some(it => it.word.toLowerCase() == w)
}

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

        /**
         * Add a word to the long-term storage list
         */
        addWord(state: LocalData, w: string)
        {
            // Make sure it doesn't already exist
            if (hasWord(state, w)) return

            state.longTermWords.push({dayLog: [], word: w})
        }
    },
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
