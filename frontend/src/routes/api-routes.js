import axios from 'axios'

export default {
	//OPTIONS
	OPTIONSItem(dispatch, rootState, endpoint, type) {
		return new Promise((resolve, reject) => {
			// console.log('OPTIONItem API-routes')
			axios.options('/django/' + endpoint, 
				{headers: {Authorization: rootState.Auth.token}}).then(response => {
				if (response.status === 200) {
					// console.log('API Call from OPTIONItem')
					response.type = type
					// dispatch('updateNotification', response);

					return resolve(response)
				}
			}).catch(error => {
				if (error.response) {
					error.response.type = type
					console.error('error.response', error.response)
					dispatch('updateNotification', error.response);
					return reject(error.response)
				}
				return reject({ error: 'There was an error' })
			})
		}).catch(error => {
			error.promise = 'promise error'
			console.error(error)
			return error
		})
	},
	// CREATE Item
	POSTItem(dispatch, rootState, payload, endpoint, type) {
		// console.log('POSTItem rootState', rootState)
		return new Promise((resolve, reject) => {
			// console.log('POSTItem payload', payload)
			axios.post('/django/' + endpoint, payload, 
				{headers: {Authorization: rootState.Auth.token}}).then(response => {
				if (response.status === 200||response.status === 201) {
					console.log('API Call from POSTItem')
					response.type = type
					dispatch('updateNotification', response);

					return resolve(response)
				}
			}).catch(error => {
				if (error.response) {
					error.response.type = type
					console.error('error.response', error.response)
					dispatch('updateNotification', error.response);
					return resolve(error.response)
				}
				return reject({ error: 'There was an error' })
			})
		}).catch(error => {
			error.promise = 'promise error'
			console.error(error)
			return error
		})
	},
	POSTMultipartForm (dispatch, rootState, payload, endpoint, type) {
		return new Promise((resolve, reject) => {
			// console.log('POSTMultipartForm payload', payload)
			const formData = new FormData
			for(let key in payload) {
				formData.set(key, payload[key])
			}
			
			axios({
				method: 'post',
				url: '/django/' + endpoint,
				headers: {'Content-Type': 'multipart/form-data', 
				'Authorization': rootState.Auth.token},
				data: formData
		
			}).then(response => {
				if (response.status === 201) {
					// console.log('API Call from POSTMultipartForm')
					response.type = type
					// dispatch('updateNotification', response);

					return resolve(response)
				}
			}).catch(error => {
				if (error.response) {
					error.response.type = type
					console.error('error.response', error.response)
					dispatch('updateNotification', error.response);
					return reject(error.response)
				}
				return reject({ error: 'There was an error' })
			})
		}).catch(error => {
			error.promise = 'promise error'
			console.error(error)
			return error
		})
	},
	// Get LIST of all items on a platform level
	GETList(dispatch, rootState, endpoint, type) {
		return new Promise((resolve, reject) => {
			axios.get('/django/' + endpoint, 
				{headers: {Authorization: rootState.Auth.token}}).then(response => {
				if (response.status === 200) {
					response.type = type
					// console.log('API Call from GETList response', response)
					// dispatch('updateNotification', response)

					return resolve(response)
				}
			}).catch(error => {
				if (error.response) {
					console.error('Error error.message', error.message)
					console.error('Error error.response', error.response)
					error.type = type
					dispatch('updateNotification', error.response)
					return reject(error)
				}
			})
		}).catch(error => {
				console.error('Error error.message', error.message)
				console.error('Error error.response', error.response)
			return error
		})
	},
	// Get A Profile By Id
	GETProfileById (dispatch, rootState, payload, endpoint, type) {
		console.log('GETProfileById', rootState.Auth.isAuthenticated)
		return new Promise((resolve, reject) => {
			axios.get('/django/' + endpoint + payload.id + "/",
				{headers: {Authorization: rootState.Auth.token}}).then(response => {
				if (response.status === 200) {
					response.type = type
					console.log('API Call from GETProfileById', response)
					dispatch('updateNotification', response);

					return resolve(response)
				}
			}).catch(error => {
				if (error.response) {
					error.type = type
					dispatch('updateNotification', error.response);
					return reject(error)
				}
			})
		}).catch(error => {
			return error
		})
	},
	// Get A Profile By Domain
	GETProfileByDomain (dispatch, rootState, payload, endpoint, type) {
		return new Promise((resolve, reject) => {
			// console.log('GETProfileByDomain payload', payload)
			// console.log('GETProfileByDomain endpoint', endpoint)
			// console.log('GETProfileByDomain type', type)
			axios.get('/django/' + endpoint + payload, 
				{headers: {Authorization: rootState.Auth.token}}).then(response => {
				if (response.status === 200) {
					response.type = type
					// console.log('API Call from GETProfileByDomain')
					dispatch('updateNotification', response);
					return resolve(response)
				}
			}).catch(error => {
				if (error.response) {
					error.type = type
					dispatch('updateNotification', error.response);
					return reject(error)
				}
			})
		}).catch(error => {
			return error
		})
	},
	// Filter List of Profiles By Id
	FILTERListById(dispatch, rootState, payload, endpoint, type) {
		console.log('FILTERListById payload', payload)
		return new Promise((resolve, reject) => {
			if (!rootState.Auth.isAuthenticated) {
				const error = {}
				error.type = 'Login Required'
				error.status = 2000
				dispatch("updateNotification", error.response);
				return reject(error)
			}
			axios.get('/django/' + endpoint + payload.id,
				{headers: {Authorization: rootState.Auth.token}}).then(response => {
				if (response.status === 200) {
					response.type = type
					// console.log('API Call from FILTERListById')
					dispatch('updateNotification', response);

					return resolve(response)
				}
			}).catch(error => {
				if (error.response) {
					error.type = type
					dispatch('updateNotification', error.response);
					return reject(error)
				}
			})
		}).catch(error => {
			return error
		})
	},

	// PATCH Methods
	PATCHItemById (dispatch, rootState, payload, endpoint, type) {
		return new Promise((resolve, reject) => {
			console.log('PATCH' + type, payload)
			if (!rootState.Auth.isAuthenticated) {
				const error = {}
				error.type = 'Login Required'
				error.status = 2000
				dispatch('updateNotification', error.response)
				// console.log('PATCHItemById error', error)
				return reject(error)
			}
			axios.patch('/django/' + endpoint + payload.id + '/', payload, 
				{headers: {Authorization: rootState.Auth.token}}).then(response => {
				// console.log('PATCH' + type, response)
				if (response.status === 200) {
					// console.log('API Call from PATCHItemById')
					response.type = 'Update' + type
					dispatch('updateNotification', response)

					return resolve(response)
				}
			}).catch(error => {
				error.type = 'Update Attendance Settings'
				dispatch('updateNotification', error.response)

				return resolve(error)
			})
		}).catch(error => {
			return error
		})
	},
	PATCHSelectedItem (dispatch, rootState, payload, endpoint, type) {
		return new Promise((resolve, reject) => {
			// console.log('PATCH' + type, payload)
			if (!rootState.Auth.isAuthenticated) {
				const error = {}
				error.type = 'Login Required'
				error.status = 2000
				dispatch('updateNotification', error.response)
				// console.log('PATCHSelectedItem error', error)
				return reject(error)
			}
			axios.patch('/django/' + endpoint + payload.filterURL + payload.id + '/', payload, 
				{headers: {Authorization: rootState.Auth.token}}).then(response => {
				// console.log('PATCH' + type, response)
				if (response.status === 200) {
					// console.log('API Call from PATCHSelectedItem')
					response.type = 'Update' + type
					dispatch('updateNotification', response)

					return resolve(response)
				}
			}).catch(error => {
				error.type = 'Update Attendance Settings'
				dispatch('updateNotification', error.response)

				return resolve(error)
			})
		}).catch(error => {
			return error
		})
	},
	// PATCH DELETE payload.is_active = false
	PATCHDeleteItem (dispatch, rootState, payload, endpoint, type) {
		return new Promise((resolve, reject) => {
			// console.log('PATCHDeleteItem', payload)
			if (!rootState.Auth.isAuthenticated) {
				const error = {}
				error.type = 'Login Required'
				error.status = 2000
				dispatch('updateNotification', error.response)
				// console.log('PATCHDeleteItem error', error)
				return reject(error)
			}
			payload.is_active = false
			
			axios.patch('/django/' + endpoint + payload.id + '/', payload, 
				{headers: {Authorization: rootState.Auth.token}}).then(response => {
				// console.log('Delete' + type, response)
				if (response.status === 200) {
					// console.log('API Call from PATCHDeleteItem')
					response.type = type
					dispatch('updateNotification', response)

					return resolve(response)
				}
			}).catch(error => {
				error.type = type
				dispatch('updateNotification', error.response)

				return resolve(error)
			})
		}).catch(error => {
			return error
		})
	},
	// Delete Methods
	DELETEItem (dispatch, rootState, payload, endpoint, type) {
		return new Promise((resolve, reject) => {
			// console.log('DELETE' + type, payload)
			if (!rootState.Auth.isAuthenticated) {
				const error = {}
				error.type = 'Login Required'
				error.status = 2000
				dispatch('updateNotification', error.response)
				// console.log('DELETEItem error', error)
				return reject(error)
			}
			axios.delete('/django/' + endpoint + payload.id + '/',
				{headers: {Authorization: rootState.Auth.token}}).then(response => {
				// console.log('DELETE' + type, response)
				if (response.status === 204) {
					// console.log('API Call from DELETEItem')
					// response.type = 'Delete' + type
					dispatch('updateNotification', response)

					return resolve(response)
				}
			}).catch(error => {
				error.type = 'Delete' + type
				dispatch('updateNotification', error.response)

				return resolve(error)
			})
		}).catch(error => {
			return error
		})
	}

}
