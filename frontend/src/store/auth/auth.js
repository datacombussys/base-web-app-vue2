import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'
import router from '@/routes'

Vue.use(Vuex)

export const Auth = {
  namespace: true,
  name: 'auth',
  state: {
    userLogin: null,
		userProfile: {},
		fullUserProfile: {},
		isAuthenticated: false,
		userLevel: null
  },
  mutations: {
    SET_USER_LOGIN (state, payload) {
      console.log('SET_USER_LOGIN payload', payload)
      state.userLogin = payload
      state.isAuthenticated = true
      console.log('SET_USER_LOGIN Payload', payload)
      localStorage.setItem('user', JSON.stringify(payload))
      localStorage.setItem('expiration', 604800)
    },
    SET_USER_PROFILE (state, payload) {
			state.userProfile = payload
			console.log("state.userProfile", state.userProfile)
		},
		SET_FULL_PROFILE(state, payload) {
			Vue.set(state.fullUserProfile, payload)
			// state.fullUserProfile = payload
			console.log('state.fullUserProfile', state.fullUserProfile)
		},
    LOG_OUT_USER (state, payload) {
      state.isAuthenticated = false
      state.userProfile = {}
      state.userLogin = null
      console.log('REMOVE_TOKEN Payload')
      localStorage.removeItem('expiration')
      localStorage.removeItem('user')
      // location.reload();
    },
    FIND_LOGIN_PROFILE (state) {
      var user = JSON.parse(localStorage.getItem('user'))
      if (user != null) {
        state.userLogin = user
				state.isAuthenticated = true
      } else {

      }
		},
		SET_USER_LEVEL(state, payload) {
			if(state.userProfile.is_superuser) {
				state.userLevel = 1
			} else if(state.userProfile.is_admin) {
				state.userLevel = 2
			} else if(state.userProfile.is_teacher) {
				state.userLevel = 3
			} else if(state.userProfile.is_parent) {
				state.userLevel = 4
			} else if(state.userProfile.is_vendor) {
				state.userLevel = 5
			} else if(state.userProfile.is_student) {
				state.userLevel = 5
			}
		}
  },
  actions: {
		FETCHLocalStorage({ dispatch, commit, state, rootState }) {
			return new Promise(async (resolve, reject) => {
				commit('FIND_LOGIN_PROFILE')
				return resolve(state.isAuthenticated)
			})
			
		},
    async preFetchLogin ({ dispatch, commit, state, rootState }) {
			return new Promise(async (resolve, reject) => {
				console.log("preFetchLogin")
				rootState.Notifications.isLoadPanelVisible = true
				//SET Global Data
				// await dispatch("LOADGlobalData")

				// const user = await dispatch('findUserInLocalStorage')
				// console.log('preFetchLogin user', user)

				// if(user) {
				// 	commit('SET_USER_LOGIN', user)
				// 	const userProfile = await dispatch('GETUserProfileById', user)
				// 	console.log('userProfile', userProfile)				
				// 	commit('SET_USER_PROFILE', userProfile)

				// 	if(userProfile) {
				// 		dispatch('LOADUserData', userProfile)
				// 		commit('SET_USER_LEVEL')
				// 		dispatch('UpdateUserAbility', state, {root:true})
				// 		rootState.Notifications.isLoadPanelVisible = false
				// 		return resolve(userProfile)
				// 	}
					
				// } else {
				// 	rootState.Notifications.isLoadPanelVisible = false
				// 	return reject("Unable to prefetch profile")
				// }

			}).catch(error => {
				console.error('preFetchLogin promise error', error)
				console.error('preFetchLogin promise error', error.message)
			})
			
		},
    findUserInLocalStorage ({ dispatch, commit, state }) {
      return new Promise(async (resolve, reject) => {
				commit('FIND_LOGIN_PROFILE')
				console.log('findUserInLocalStorage state.userProfile', state.userProfile)
        return resolve(state.userLogin)
      })
    },

    async login ({ dispatch, commit, state, rootState }, credentials) {
      console.log('credentials', credentials)

      axios.post('/django/login/', credentials).then(async response => {
        console.log('response', response)
        if (response.status === 200) {
					console.log('Login response.data', response.data)
					rootState.Notifications.isLoadPanelVisible = true

					//SET Global Data
			// 		await dispatch("LOADGlobalData")

			// 		commit('SET_USER_LOGIN', response.data)

			// 		const UserObj = await dispatch('GETUserProfileById', { id: response.data.id })
			// 		console.log('UserObj', UserObj)
			// 		commit("SET_USER_PROFILE", UserObj)
					
			// 		if(UserObj) {
			// 			dispatch('LOADUserData', UserObj)
			// 			commit('SET_USER_LEVEL')
			// 			dispatch('UpdateUserAbility', state, {root:true})
			// 		}
			// 		rootState.Notifications.isLoadPanelVisible = false

				}
			}).catch(error => {
				rootState.Notifications.isLoadPanelVisible = false
				console.log('Error Logging In', error.response)
				error.type = 'Login Unsuccessful'
				// dispatch("updateNotification", error.response);
			})
		},
		async LOADGlobalData({ dispatch, commit, state, rootState }) {
			console.group('LOADGlobalData')
			//Get list of all SuperUsers
			let superUserList = await dispatch('GETSuperUserList')
			console.log('superUserList', superUserList)
			
			//Get List of All Merchants
			let merchantList = await dispatch('GETMerchantList')
			console.log('merchantList', merchantList)

		},
		async LOADUserData({ dispatch, commit, state, rootState }, profile) {
			console.group('LOADUserData')
			//Load User Profile by Hierarchy
			if(profile.is_superuser) {
				let response = await dispatch("FILTERSuperUserProfileById", profile)
				commit('SET_FULL_PROFILE', response)
				console.log('state.fullUserProfile', state.fullUserProfile)
				
			} else if(profile.is_merchant) {
				let response = await dispatch("FILTEREmpoyeeProfileById", profile)
				console.log('response', response)
				commit('SET_FULL_PROFILE', response)

				//Get User's Merchant Specific Data
				console.log('state.fullUserProfile', state.fullUserProfile)
				let merchantObj = await dispatch('GETMerchantProfileById', state.fullUserProfile.merchant_obj.merchant_obj)
				console.log('merchantObj', merchantObj)

				dispatch('GETMerchantEmployeeList', {id: response.merchant})
			}

			//Route User to Home Page
			console.log('auth.js router', router)
			router.replace({name: 'Secured', query:router.history.current.name}).catch(error => {
				console.error('Logging in Navigation error', error)
			})

		},
    logout ({ dispatch, commit, store }) {
      commit('LOG_OUT_USER')
    }
  },
  getters: {
    IS_AUTHENTICATED(state) {
      return state.isAuthenticated
		},
		GET_USER_PROFILE(state) {
			return state.userProfile
		},
		GET_FULL_PROFILE(state) {
			return state.fullUserProfile
		},
		GET_USER_LEVEL(state) {
			return state.userLevel
		}

  }
}
