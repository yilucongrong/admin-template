import variables from '@/styles/element-variables.scss'
import defaultSettings from '@/settings'

const {
    showSettings,
    tagsView,
    fixedHeader,
    sidebarLogo,
    showSidebar,
    showBraed
} = defaultSettings

const state = {
    theme: variables.theme,
    showSettings: showSettings,
    tagsView: tagsView,
    fixedHeader: fixedHeader,
    sidebarLogo: sidebarLogo,
    showSidebar: showSidebar, //侧边栏
    showBraed: showBraed //面包削导航
}

const mutations = {
    CHANGE_SETTING: (state, { key, value }) => {
        if (state.hasOwnProperty(key)) {
            state[key] = value
        }
    }
}

const actions = {
    changeSetting({ commit }, data) {
        commit('CHANGE_SETTING', data)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
