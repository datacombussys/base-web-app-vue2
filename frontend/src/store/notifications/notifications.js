import apiRoutes from '@/routes/api-routes'

export const Notifications = {
  namespace: true,
  name: 'notifications',
  state: {
		//Main Loading Panel
		isLoadPanelVisible: false,
		
		//Home Spinning Loader
		spinner: false,

		// Alert
		showAlert: false,
		alert: {},
		
		//Stacked Toasts
		snackBarStack: [],

		//Popups
		showNotification: false,
		notificationPopup: {}
  },
  mutations: {
		PUSH_SNACKBAR(state, payload) {
			state.snackBarStack.push({
				message: payload.msg,
				color: payload.color,
				timeout: 2500,
				left: true
			})
		},
		UPDATE_LOGIN_NOTIFICATIONS(state, payload) {
			state.updateLoginNotification = payload;
			// console.log("updateLoginNotifications Message Payload in store.js:", payload);
		},
		NOTIFICATION_POPUP(state, payload) {
			// console.log('NOTIFICATION_MESSAGES, payload', payload)
			console.log('state.showAlert', state.showAlert)
			state.showNotification = true
			state.notificationPopup = payload
			console.log('state.showAlert', state.showAlert)
			setTimeout(function() { 
				state.showAlert = false

			}, 5000); 
		},
		PUSH_ALERT(state, payload) {
			console.log('PUSH_ALERT, payload', payload)
			state.showAlert = true
			state.alert = payload
			setTimeout(function() { 
				state.showAlert = false

			}, 5000); 
		},
		RESET_ALERT(state, payload) {
			state.showAlert = false
		}
  },
  actions: {
		openAlert({ commit, dispatch, rootState }, payload) {
			commit("PUSH_SNACKBAR", payload)
		},
		notificationPopup({ commit, dispatch, rootState }, payload) {
			//title: and body:
			commit("NOTIFICATION_POPUP", payload)
		},
		showAlert({ commit, dispatch, rootState }, payload) {
			console.log('PUSh_ALERT, payload', payload)
			//Body, color, icon
			commit('PUSH_ALERT', payload)
		}
  },
  getters: {


  }
}
