/**
 * meta 可配置参数
 * @param {boolean} icon 页面icon
 * @param {boolean} keepAlive 是否缓存页面
 * @param {string} title 页面标题
 */

export const constantRoutes: any[] = [{
        path: '/login',
        hidden: true, // 不显示在左侧栏
        component: (resolve: any) =>
            require(["@/views/login/login.vue"], resolve),
    },
    {
        path: "/",
        hidden: true, // 不显示在左侧栏
        redirect: "/login"
    },

]

export const asyncRoutes: any[] = []
