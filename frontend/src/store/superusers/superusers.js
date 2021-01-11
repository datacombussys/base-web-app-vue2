import Vue from 'vue'
import Vuex from 'vuex'

import apiRoutes from '@/js/api-routes'

Vue.use(Vuex)

export const SuperUsers = {
  namespace: true,
  name: 'superusers',
  state: {
		superUserList: [],
		superUserProfile: {},
  },
  mutations: {
		SET_SUPERUSER_LIST(state, payload) {
			state.superUserList = payload
		},
		SET_SUPERUSER_PROFILE(state, payload) {
			state.superUserProfile = Object.assign({}, payload)
		},
		PUSH_NEW_SUPERUSER(state, payload) {
			Vue.set(state.superUserList, state.superUserList.length, payload)
		}
  },
  actions: {
		//POST and CREATE Item
		async POSTSuperUser({commit, dispatch, rootState}, payload) {
			return new Promise( async (resolve, reject) => {
				try {
					let endpoint = 'superusers/';
					let type = 'Create New SuperUser';
					let response = await apiRoutes.POSTItem(dispatch, rootState,payload, endpoint, type)
					console.log('POSTSuperUser response', response);
					if(response.status === 201) {
						console.log("Successful");
						commit('PUSH_NEW_SUPERUSER', response.data);
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

		//GET LISTS
		async GETSuperUserList({commit, dispatch, rootState}) {
			return new Promise( async (resolve, reject) => {
				try {
					let endpoint = 'superusers-list/';
					let type = 'Get SuperUsers List';
					let response = await apiRoutes.GETList(dispatch, rootState, endpoint, type);
					console.log('GETSuperUsersList response', response);
					commit('SET_SUPERUSER_LIST', response.data);
					return resolve(response.data)

				} catch(error) {
					console.error('Error error.message', error.message)
					console.error('Error error.response', error.response)
					return reject(error)
				}
			}).catch(error => {
				console.error('Error error.message', error.message)
				console.error('Error error.response', error.response)
				return error;
			});
		},

    // GET SuperUser Profile Profile By Id
    GETSuperUserProfileById ({ commit, dispatch, rootState }, payload) {
      console.log('GETSuperUserProfileById payload', payload)
      return new Promise(async (resolve, reject) => {
        try {
          const endpoint = 'superusers/'
          const type = 'Get Superuser Profile'
          const response = await apiRoutes.GETProfileById(dispatch, rootState, payload, endpoint, type)
          if (response.status === 200) {
            console.log('GETSuperUserProfileById response', response)
            commit('SET_SUPERUSER_PROFILE', response.data)
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
		},
		// FILTER SuperUser Profile Profile By Id
    FILTERSuperUserProfileById ({ commit, dispatch, rootState }, payload) {
      console.log('FILTERSuperUserProfileById payload', payload)
      return new Promise(async (resolve, reject) => {
        try {
          const endpoint = 'superusers/?user__id='
          const type = 'Get Superuser Profile'
          const response = await apiRoutes.FILTERListById(dispatch, rootState, payload, endpoint, type)
          if (response.status === 200) {
            console.log('FILTERSuperUserProfileById response', response)
            commit('SET_SUPERUSER_PROFILE', response.data[0])
            return resolve(response.data[0])
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
		GET_SUPERUSER_LIST(state) {
			return state.superUserList
		},
		GET_SUPERUSER_PROFILE(state) {
			return state.superUserProfile
		}

  }
}
