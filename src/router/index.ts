import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'
import Home from '../views/Home.vue'
import ReviewScreen from "@/views/ReviewScreen.vue";
import Debug from "@/views/Debug.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/review',
        name: 'Review',
        component: ReviewScreen
    },
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
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
