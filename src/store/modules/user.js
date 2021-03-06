import { getTokenId, getCatalog } from '@/api/login'
import * as auth from '@/utils/auth'
import router, { resetRouter } from '@/router'
import { changeUserInfo, relation } from '@/api/system/user'

const state = {
    user: '',
    status: '',
    code: '',
    tokenTime: auth.getTokenTime(),
    token: auth.getToken(),
    addRouters: '',
    name: auth.getName(),
    passWord: auth.getPassWord(),
    menu: auth.getCatalogs(),
    avatar: '',
    introduction: '',
    superRoles: false,
    roles: [],
    domainId: auth.getDomainId(),
    domainName: auth.getDomainName(),
    setting: {
        articlePlatform: []
    },
    theme: auth.getTheme()
}

const mutations = {
    SET_CODE: (state, code) => {
        state.code = code
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_TOKENTIME: (state, tokenTime) => {
        state.tokenTime = tokenTime
    },
    SET_MENU: (state, menu) => {
        state.menu = menu
    },
    SET_INTRODUCTION: (state, introduction) => {
        state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
        state.setting = setting
    },
    SET_STATUS: (state, status) => {
        state.status = status
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_PASSWORD: (state, password) => {
        state.passWord = password
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_SUPER_ROLES: (state, superRoles) => {
        state.superRoles = superRoles
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    },
    SET_DOMAINID: (state, domainId) => {
        state.domainId = domainId
    },
    SET_DOMAINNAME: (state, domainName) => {
        state.domainName = domainName
    },
    SET_THEME: (state, theme) => {
        state.theme = theme
    }
}

const actions = {
    // user login
    // login({ commit }, userInfo) {
    //     const { username, password } = userInfo
    //     return new Promise((resolve, reject) => {
    //     login({ username: username.trim(), password: password }).then(response => {
    //         const { data } = response
    //         commit('SET_TOKEN', data.token)
    //         setToken(data.token)
    //         resolve()
    //     }).catch(error => {
    //         reject(error)
    //     })
    //     })
    // },
    //用户登录
    LoginByUsername({ commit }, userInfo) {
        const auths = {
            auth: {
                identity: {
                    methods: ['password'],
                    password: {
                        user: {
                            name: userInfo.username,
                            password: userInfo.password
                        }
                    }
                }
            }
        }
        commit('SET_NAME', userInfo.username)
        commit('SET_PASSWORD', userInfo.password)

        return new Promise((resolve, reject) => {
            //获取刷新token
            getTokenId(auths)
                .then(res => {
                    commit('SET_DOMAINID', res.data.token.domainId)
                    commit('SET_DOMAINNAME', res.data.token.domainName)
                    commit('SET_THEME', res.data.token.theme)
                    auth.setDomainId(res.data.token.domainId)
                    auth.setDomainName(res.data.token.domainName)
                    auth.setTheme(res.data.token.theme)
                    const userToken = {
                        auth: {
                            identity: {
                                methods: ['token'],
                                token: {
                                    id: res.headers['x-subject-token']
                                }
                            }
                        }
                    }
                    //获取访问token
                    getTokenId(userToken).then(response => {
                        commit('SET_TOKEN', response.headers['x-subject-token'])
                        commit('SET_TOKENTIME', response.data.token.expireAt)
                        auth.setTokenTime(response.data.token.expireAt)
                        auth.setToken(response.headers['x-subject-token'])
                        auth.setName(userInfo.username)
                        auth.setPassWord(userInfo.password)

                        let queryRole = {
                            type: 1,
                            currentPage: 1,
                            pageSize: 1000,
                            page: 1
                        }
                        relation(userInfo.username, queryRole).then(resr => {
                            // commit('SET_ROLES', resr.data.list);
                            let superRole = false
                            resr.data.list.forEach(item => {
                                if (item.roleCode === 'WMS-SUPER') {
                                    commit('SET_SUPER_ROLES', true)
                                    superRole = true
                                }
                            })
                            if (!superRole) {
                                commit('SET_SUPER_ROLES', false)
                            }
                        })
                        resolve()
                    })
                })
                .catch(error => {
                    reject(error)
                })
        })
    },
    //获取菜单资源
    GetMenu() {
        return new Promise((resolve, reject) => {
            getCatalog(auth.getName())
                .then(response => {
                    // console.log(response.data.catalogVMs[0])
                    // auth.setCatalogs(response.data.catalogVMs[0])
                    // console.log(auth.getCatalogs())
                    // console.log('SET_MENU存在')

                    resolve(response.data.catalogVMs)
                })
                .catch(error => {
                    auth.removeToken()
                    this.$router.push({ path: '/' }) //重定向到首页
                    reject(error)
                })
        })
    },

    // 用户退出
    logout({ commit }) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            auth.removeToken()
            resetRouter()
            resolve()
            //   logout(state.token).then(() => {
            //     commit('SET_TOKEN', '')
            //     commit('SET_ROLES', [])
            //     removeToken()
            //     resetRouter()
            //     resolve()
            //   }).catch(error => {
            //     reject(error)
            //   })
        })
    },

    // 删除token
    resetToken({ commit }) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            auth.removeToken()
            resolve()
        })
    },

    // 动态修改权限
    changeRoles({ commit, dispatch }, role) {
        return new Promise(async resolve => {
            const token = role + '-token'

            commit('SET_TOKEN', token)
            auth.setToken(token)

            const { roles } = await dispatch('getInfo')

            resetRouter()

            // generate accessible routes map based on roles
            const accessRoutes = await dispatch(
                'permission/generateRoutes',
                roles,
                { root: true }
            )

            // dynamically add accessible routes
            router.addRoutes(accessRoutes)

            // reset visited views and cached views
            dispatch('tagsView/delAllViews', null, { root: true })

            resolve()
        })
    },
    //修改用户信息
    ChangeUserInfo({ commit }, userDTO) {
        return new Promise((resolve, reject) => {
            changeUserInfo(userDTO)
                .then(res => {
                    resolve(res)
                })
                .catch(error => {
                    console.log(commit)
                    reject(error)
                })
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
