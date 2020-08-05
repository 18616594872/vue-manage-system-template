import {
    VuexModule,
    Module,
    Action,
    Mutation,
    getModule
} from 'vuex-module-decorators'
import {
    login,
    getInfo,
    logout
} from '@/api/user'
import store from '@/store'
import {
    resetRouter
} from '@/router'
import {
    setToken,
    getToken,
    removeToken,
    TOKEN_KEY
} from '@/utils/common'

export interface UserState {
    token: string,
        name: string,
        routelist: string[],
        permissions: object[],
}

@Module({
    dynamic: true,
    store,
    name: 'user'
})
class User extends VuexModule implements UserState {

    token = getToken(TOKEN_KEY) || ''
    name = ''
    routelist: string[] = []
    permissions: object[] = []

    @Mutation
    SET_TOKEN(token: string) {
        this.token = token
    }

    @Mutation
    SET_NAME(name: string) {
        this.name = name
    }

    @Mutation
    SET_ROUTLIST(routeList: string[]) {
        this.routelist = routeList
    }

    @Mutation
    SET_PERMISSIONS(permissions: object[]) {
        if (!permissions.length) {
            this.permissions = permissions
            return
        }
        for (let o of permissions) {
            (typeof o !== 'string') && (this.permissions.push(...this.permissions))
        }
    }

    @Action
    async login(userInfo: {
        userName: string,
        passWord: string
    }) {
        const {
            userName,
            passWord
        } = userInfo

        let {
            data: {
                data,
                code
            }
        } = await login({
            userName,
            passWord
        })

        if (code === 200) {
            this.SET_TOKEN(data.token)
            setToken(TOKEN_KEY, data.token)
        }

    }

    @Action
    async getInfo(token: string) {
        let {
            data: {
                code,
                data: [{
                    name,
                    routes,
                    permission
                }]
            }
        } = await getInfo(token)

        if (code !== 200) {
            throw Error("验证失败，请重新登录")
        }

        this.SET_NAME(name)
        this.SET_ROUTLIST(routes)
        this.SET_PERMISSIONS(permission)
    }

    @Action
    async logout() {
        let {
            data: {
                code,
                data
            }
        } = await logout()

        if (code !== 200) {
            throw Error("退出失败")
        }

        this.SET_TOKEN('')
        this.SET_NAME('')
        this.SET_ROUTLIST([])
        this.SET_PERMISSIONS([])
        removeToken(TOKEN_KEY)
        resetRouter()
    }

}

export const UserModule = getModule(User)