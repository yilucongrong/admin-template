import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

// 一次引入全部图标
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

import App from './App.vue'
import router from './router'
import store from './store'

import i18n from './lang' // internationalization
import './icons' // icon
import './permission' // permission control

import * as filters from './filters' // global filters
import '@/utils/directives.js' //弹窗可以拖拽组件

import myFun from '@/utils/myFun.js' //myFun封装方法

Vue.use(Element, {
    size: Cookies.get('size') || 'medium', // set element-ui default size
    i18n: (key, value) => i18n.t(key, value)
})
Vue.prototype.$myFun=myFun;  //其中$xx为新命的名。

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})
Vue.config.productionTip = false
new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')

Vue.component('v-icon', Icon)