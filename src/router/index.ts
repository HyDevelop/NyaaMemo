import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'
import Home from '../views/Home.vue'
import Debug from "@/views/Debug.vue";
import Review from "@/views/Review.vue";
import WordSelection from "@/views/WordSelection.vue";
import Stats from "@/views/Stats.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/review',
        name: 'Review',
        component: Review
    },
    {
        path: '/words',
        name: 'Word Selection',
        component: WordSelection
    },
    {
        path: '/stats',
        name: 'Stats',
        component: Stats
    },
    // Hidden
    {
        path: '/debaggu',
        name: 'デバッグ',
        component: Debug
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
