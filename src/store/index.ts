import Vue from 'vue'
import Vuex from 'vuex'
import {
  UserState
} from './module/user'
import {
  PermissionState
} from './module/permission'
import {
  CommonState
} from './module/common'

Vue.use(Vuex)

interface RootStore {
  user: UserState
  permission: PermissionState
  common: CommonState
}

export default new Vuex.Store < RootStore > ({})