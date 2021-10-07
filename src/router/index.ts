import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'
import Debug from "@/views/Debug.vue";
import Review from "@/views/0-Review.vue";
import WordSelection from "@/views/Backup-WordSelection.vue";
import Stats from "@/views/2-Stats.vue";
import SettingsView from "@/views/3-Settings.vue";
import Create from "@/views/4-Create.vue";
import WordAdd from "@/views/1-WordAdd.vue"
import WorkspaceSelection from "@/views/0-WorkspaceSelection.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/workspaces',
        name: 'Workspace Selection',
        component: WorkspaceSelection
    },
    {
        path: '/',
        name: 'Review',
        component: Review
    },
    {
        path: '/words',
        name: 'Word Selection',
        component: WordSelection
    },
    {
        path: '/wordadd',
        name: 'Word Add',
        component: WordAdd
    },
    {
        path: '/stats',
        name: 'Stats',
        component: Stats
    },
    {
        path: '/settings',
        name: 'Settings',
        component: SettingsView
    },
    {
        path: '/create',
        name: 'Create',
        component: Create
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
