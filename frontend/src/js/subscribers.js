import Vue from 'vue'
import store from "@/store";

// console.log("store", store)
// console.log('this', this)
// console.log('Vue', Vue)
// console.log('Vue.prototype', Vue.prototype)

store.subscribe((mutation) => {
	// console.log("store.subscribe")
	// console.log("store", store)
	
	//If Successful Login
	if (mutation.type === 'UPDATE_LOGIN_NOTIFICATIONS') {
		console.log("state.UPDATE_LOGIN_NOTIFICATIONS has been set to:", mutation);
		store.dispatch()
				
	} 
	if (mutation.type === 'UPDATE_NOTIFICATIONS') {
		// console.log("Unsuccessful login subscribers:")
		// console.log("store", store)
		console.log("Vue", Vue)

		store._modules.root.state.Notifications.snackBarStack.push({
			message:mutation.payload.msg,
			color:mutation.payload.color,
			timeout:3000
		})

	}
	if (mutation.type === 'NOTIFICATION_POPUP') {
		console.log("Notification Messages subscribers:")

		store._modules.root.state.Notifications.alert = {
			title: mutation.payload.title,
			body: mutation.payload.body,
		}
		store._modules.root.state.Notifications.showAlert= true

	}
});

