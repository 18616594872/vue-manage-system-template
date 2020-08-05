import {
    VuexModule,
    Module,
    Mutation,
    getModule
} from 'vuex-module-decorators'
import store from '@/store'

export interface CommonState {
    leftTreeRouters: []
}

@Module({
    dynamic: true,
    store,
    name: 'common'
})
class Common extends VuexModule implements CommonState {

    leftTreeRouters: any = []

    @Mutation
    SET_TREEROUTRES(leftTreeRouters: any) {
        this.leftTreeRouters = leftTreeRouters
    }
}

export const commonModule = getModule(Common)