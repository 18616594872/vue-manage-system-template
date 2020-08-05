import {
    VuexModule,
    Module,
    Mutation,
    getModule,
    Action
} from 'vuex-module-decorators'
import store from '@/store'
import { getLocale } from '@/lang'

export interface CommonState {
    leftTreeRouters: []
    language: string
}

@Module({
    dynamic: true,
    store,
    name: 'common'
})
class Common extends VuexModule implements CommonState {

    leftTreeRouters: any = []
    language = getLocale()

    @Mutation
    SET_TREEROUTRES(leftTreeRouters: any) {
        this.leftTreeRouters = leftTreeRouters
    }

    @Mutation
    SET_LANGUAGE(language: string){
        this.language = language
    }

    @Action
    SetLanguage(language: string){
        this.SET_LANGUAGE(language)
    }
}

export const commonModule = getModule(Common)