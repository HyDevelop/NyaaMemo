import {createStore, Store} from 'vuex'
import VuexPersistence from "vuex-persist";
import {DailyProgress, LocalData} from "@/logic/models";
import {removeIf} from "@/logic/utils";
import SettingsView from "@/views/3-Settings.vue";
import Settings from "@/logic/settings";

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
        longTermProgress: [],
        dailyProgress: undefined,
        settings: { maxPerDay: 20 }
    },
    mutations: {
        _addWord(state: LocalData, w: string)
        {
            state.longTermProgress.push({dayLog: [], word: w})
        },

        _removeWord(state: LocalData, w: string)
        {
            w = w.toLowerCase()
            state.longTermProgress = removeIf(state.longTermProgress, it => it.word.toLowerCase() == w)
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
        return this.state.longTermProgress.some(it => it.word.toLowerCase() == w)
    }

    /**
     * Add a word to the list
     */
    addWord(w: string)
    {
        // Make sure it doesn't already exist
        if (this.hasWord(w)) return

        // Add word
        this.store.commit('_addWord', w)
    }

    /**
     * Remove word
     */
    removeWord(w: string)
    {
        this.store.commit('_removeWord', w)
    }

    /**
     * Getters for the original state
     */
    get state() { return this.store.state as LocalData }
    get loggedIn() { return this.state.loggedIn }
    get longTermProgress() { return this.state.longTermProgress }
}

/**
 * For some reason IntelliJ wouldn't autocomplete if I just typed store.state,
 * so I'll have to encapsulate it here and specify the type.
 */
export function local(): StateUtils
{
    return new StateUtils(store)
}
