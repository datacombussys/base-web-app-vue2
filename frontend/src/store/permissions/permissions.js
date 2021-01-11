import Vue from 'vue'
import Vuex from 'vuex'

import apiRoutes from '@/js/api-routes'

import { AbilityBuilder } from '@casl/ability';
import abilities from "@/js/permissions-ability"

Vue.use(Vuex)

export const Permissions = {
  namespace: true,
  name: 'permissions',
  state: {

  },
  mutations: {

  },
  actions: {
		UpdateUserAbility(data) {
			const { can, rules } = new AbilityBuilder();
			
			const userObj = data.rootState.Auth["userProfile"]
			console.log("updateAbility rootState.Auth", userObj)
			
			if(userObj.is_superuser) {
				can('view', 'superuser');
				can('view', 'merchant');

			}else if(userObj.is_merchant) {
				can('view', 'merchant');

			}
			

			abilities.update(rules);
		},



  },
  getters: {

  }
}
