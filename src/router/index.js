import { createRouter, createWebHistory } from "vue-router";

const routes = [
    { path: '/', redirect: '/home' },
    { path: '/home', component: () => import('@/pages/home/index.vue') },
    { path: '/sign', component: () => import('@/pages/sign/index.vue') }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
})

router.beforeEach((to, from, next) => {
    if (typeof (to.meta?.title) === 'string') {
        document.title = to.meta?.title + ' | FeiBack';
    }

    next()
})

export default router