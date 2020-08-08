import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import echarts from 'echarts'
import store from '@/store'
import i18n from '@/lang'
import ElementUI from 'element-ui'
import * as directives from '@/directive'
import '@/assets/font/svg-icon.js'

import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI, {
    i18n: (key: string, value: string) => i18n.t(key, value)
})

// 挂载全局指令
Object.keys(directives).forEach( (key: string) => {
    Vue.directive(key, (directives as { [key: string ]: any })[key])
} )

Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;

async function init() {
    try {
        let request = (await import("@/utils/config")).default;
        await request();
        let permission = (await import("@/permission")).permission;
        await permission();
    } catch (error) {
        throw new Error(error)
    }
}

init().then(res => {
    new Vue({
        router,
        store,
        i18n,
        render: (h) => h(App)
    }).$mount('#app');

})