import Vue from 'vue'
import Vuex from 'vuex'

import apiRoutes from '@/js/api-routes'

Vue.use(Vuex)

export const Users = {
  namespace: true,
  name: 'users',
  state: {
		userList: []
  },
  mutations: {

  },
  actions: {
		//POST and CREATE Item
		async POSTUser({commit, dispatch, rootState}, payload) {
			return new Promise( async (resolve, reject) => {
				try {
					let endpoint = 'users/';
					let type = 'Create New User';
					let response = await apiRoutes.POSTItem(dispatch, rootState,payload, endpoint, type)
					console.log('POSTUser response', response);
					if(response.status === 201) {
						console.log("Successful response", response);
						return resolve(response)
					} else {
						return reject(response)
					}
				} catch (error) {
					return reject(response)
				}       
			}).catch(error => {
				return error;
			});
		},

    // GET User Profile By Id
    GETUserProfileById ({ commit, dispatch, rootState }, payload) {
      console.log('GETUserProfileById')
      return new Promise(async (resolve, reject) => {
        try {
          console.log('GETUserProfileById payload', payload)
          const endpoint = 'users/'
          const type = 'Get User Profile'
          const response = await apiRoutes.GETProfileById(dispatch, rootState, payload, endpoint, type)
          if (response.status === 200) {
            console.log('GETUserProfileById response', response)
            // commit('SET_USER_PROFILE', response.data)
						return resolve(response.data)
						
          } else {
            return reject({ message: response })
          }
        } catch (error) {
          return reject(error)
        }
      }).catch(error => {
        console.log('error', error)
        if (error.response) {
          console.log('error.response', error.response)
          // dispatch('updateNotification', error.response);
          return reject(error)
        }
      })
    }

  },
  getters: {

  }
}
