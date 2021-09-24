import Vue from 'vue'
import Vuex from 'vuex'

import { Users } from '@/store/users/users'
import { Permissions } from '@/store/permissions/permissions'
import { Auth } from '@/store/auth/auth'
import { Notifications } from '@/store/notifications/notifications'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
		Auth,
		Notifications,
		Permissions,
		Users
  },
  state: {
  },
  mutations: {
  },
  actions: {
  },
  getters: {

  }
})