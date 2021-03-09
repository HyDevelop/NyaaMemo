import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'
import Home from '../views/Home.vue'
import ReviewScreen from "@/views/ReviewScreen.vue";
import Debug from "@/views/Debug.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/review',
        name: 'Review',
        component: ReviewScreen
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
