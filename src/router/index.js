import { createRouter, createWebHistory } from "vue-router";
import { unAuthorized } from "@/api";

const routes = [
    { path: '/', redirect: '/home' },
    {
        path: '/home', component: () => import('@/pages/home/index.vue'),
        children: [
            {
                path: '',
                name: 'main',
                meta: { title: "首页" },
                component: () => import('@/pages/home/home.vue')
            },
            {
                path: 'test',
                name: 'test',
                meta: { title: "测试" },
                component: () => import('@/pages/home/test.vue')
            }
        ]

    },
    {
        path: '/sign', component: () => import('@/pages/sign/index.vue'),
        children: [
            {
                path: '',
                name: 'login',
                meta: { title: "登录" },
                component: () => import('@/pages/sign/login.vue')
            }, {
                path: 'register',
                name: 'register',
                meta: { title: "注册" },
                component: () => import('@/pages/sign/register.vue')
            }, {
                path: 'reset',
                name: 'reset',
                meta: { title: "重置密码" },
                component: () => import('@/pages/sign/reset.vue')
            }
        ]
    },
    { path: '/:pathMatch(.*)*', meta: { title: "404" }, name: 'NotFound', component: () => import('@/pages/error/404.vue') },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
})

router.beforeEach((to, from, next) => {
    if (typeof (to.meta?.title) === 'string') {
        document.title = to.meta?.title + ' | FeiBack';
    }
    const isUnAuthorized = unAuthorized();
    if (to.fullPath.startsWith('/sign') && !isUnAuthorized) {
        next('/home')
    } else if (to.fullPath.startsWith('/home') && isUnAuthorized) {
        next('/sign')
    } else {
        next()
    }
    // next()
})

export default router