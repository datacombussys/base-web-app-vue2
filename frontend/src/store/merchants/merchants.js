import Vue from 'vue'
import Vuex from 'vuex'

import apiRoutes from '@/js/api-routes'

Vue.use(Vuex)

export const Merchants = {
  namespace: true,
  name: 'merchants',
  state: {
		merchantList: [],
		merchantProfile: {},
		merchantOptions: {},
		merchantEmployeeList: [],
		merchantEmployeeProfile: {}
  },
  mutations: {
		SET_MERCHANT_LIST(state, payload) {
			state.merchantList = payload
		},
		PUSH_NEW_MERCHANT(state, payload) {
			Vue.set(state.merchantList, state.merchantList.length, payload)
		},
		SET_MERCHANT_PROFILE(state, payload) {
			Vue.set(state.merchantProfile, payload);
		},
		SET_EMPLOYEE_PROFILE(state, payload) {
			Vue.set(state.merchantEmployeeProfile, payload);
		},
		SET_MERCHANT_OPTIONS(state, payload) {
			console.log("SET_MERCHANT_OPTIONS payload", payload)
			Vue.set(state.merchantOptions, payload);
			console.log("state.merchantOptions", state.merchantOptions)
		},
		SET_MERCHANT_EMPLOYEE_LIST(state, payload) {
			state.merchantEmployeeList = payload
		}
  },
  actions: {
		//OPTIONS
		async OPTIONSMerchant({commit, dispatch, rootState}) {
			console.log("OPTIONSMerchant")
			return new Promise( async (resolve, reject) => {
				try {
					let endpoint = 'merchants/';
					let type = 'GET Merchant Options';
					let response = await apiRoutes.OPTIONSItem(dispatch, rootState, endpoint, type)
					if(response.status === 200) {
						console.log("OPTIONSMerchant response", response);
						commit('SET_MERCHANT_OPTIONS', response.data.actions.POST);
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
		//POST and CREATE Item
		async POSTMerchant({commit, dispatch, rootState}, payload) {
			return new Promise( async (resolve, reject) => {
				try {
					let endpoint = 'merchants/';
					let type = 'Create New Merchant';
					let response = await apiRoutes.POSTItem(dispatch, rootState,payload, endpoint, type)
					console.log('POSTMerchant response', response);
					if(response.status === 201) {
						console.log("Successful");
						commit('PUSH_NEW_MERCHANT', response.data);
						return resolve(response)
					} else {
						return reject(response)
					}
				} catch (error) {
					return reject(error)
				}       
			}).catch(error => {
				return error;
			});
		},

		//GET LISTS
		async GETMerchantList({commit, dispatch, rootState}) {
			return new Promise( async (resolve, reject) => {
				try {
					let endpoint = 'merchants-list/';
					let type = 'Get Merchants List';
					let response = await apiRoutes.GETList(dispatch, rootState, endpoint, type);
					console.log('GETMerchantsList response', response);
					commit('SET_MERCHANT_LIST', response.data);
					return resolve(response.data)

				} catch(error) {
					console.error('TryCatch Error error.response', error.response)
					return reject(error)
				}
			}).catch(error => {
				console.error('Promise Error error.response', error.response)
				return error;
			});
		},
		//GET Merchant Employees by ID by FILTER
		async GETMerchantEmployeeList({commit, dispatch, rootState}, payload) {
			return new Promise( async (resolve, reject) => {
				try {
					let endpoint = 'employees-list/?merchant=';
					let type = 'Get Merchant Employees List';
					let response = await apiRoutes.FILTERListById(dispatch, rootState, payload, endpoint, type);
					console.log('GETMerchantEmployeeList response', response);
					commit('SET_MERCHANT_EMPLOYEE_LIST', response.data);
					return resolve(response.data)

				} catch(error) {
					console.error('TryCatch Error error.response', error.response)
					return reject(error)
				}
			}).catch(error => {
				console.error('Promise Error error.response', error.response)
				return error;
			});
		},

    // GET Logged In Merchant Profile Profile By Id
    GETMerchantProfileById ({ commit, dispatch, rootState }, payload) {
      console.log('GETMerchantProfileById')
      return new Promise(async (resolve, reject) => {
        try {
          console.log('GETMerchantProfileById payload', payload)
          const endpoint = 'merchants/?id='
          const type = 'Get Merchant Profile'
          const response = await apiRoutes.GETProfileById(dispatch, rootState, payload, endpoint, type)
          if (response.status === 200) {
            console.log('GETMerchantProfileById response', response)
            commit('SET_MERCHANT_PROFILE', response.data)
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
		// FILTER MerchantUser Profile Profile By Id
    FILTEREmpoyeeProfileById ({ commit, dispatch, rootState }, payload) {
      console.log('FILTEREmpoyeeProfileById payload', payload)
      return new Promise(async (resolve, reject) => {
        try {
          const endpoint = 'employees/?user__id='
          const type = 'Get Merchant Employee Profile'
          const response = await apiRoutes.FILTERListById(dispatch, rootState, payload, endpoint, type)
          if (response.status === 200) {
            console.log('FILTEREmpoyeeProfileById response', response)
            commit('SET_EMPLOYEE_PROFILE', response.data[0])
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
		GET_MERCHANT_LIST(state) {
			return state.merchantList
		},
		GET_MERCHANT_OPTIONS(state) {
			return state.merchantOptions
		},
		GET_MERCHANT_EMPLOYEES_LIST(state) {
			return state.merchantEmployeeList
		},
		GET_EMPLOYEE_PROFILE(state) {
			return state.merchantEmployeeProfile
		}
  }
}
