import {createApp} from 'vue'
import App from './App.vue'

// Create app
const app = createApp(App)

// Vuex
import store from './store'
import {Store} from "vuex";
import {LocalData} from "@/logic/models";
declare module '@vue/runtime-core' {
    // provide typings for `this.$store`
    interface ComponentCustomProperties {
        $store: Store<LocalData>;
    }
}
app.use(store)

// Router
import router from './router'
app.use(router)

// Element UI
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
app.use(ElementPlus)

// Cookies
import VueCookies from 'vue3-cookies'
// @ts-ignore
app.use(VueCookies)

// Mount app
app.mount('#app')
