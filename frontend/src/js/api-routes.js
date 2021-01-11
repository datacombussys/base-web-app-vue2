import axios from 'axios'

export default {
	//OPTIONS
	OPTIONSItem(dispatch, rootState, endpoint, type) {
    return new Promise((resolve, reject) => {
      console.log('OPTIONItem API-routes')
      axios.options('/django/' + endpoint).then(response => {
        if (response.status === 200) {
          console.log('API Call from OPTIONItem')
          response.type = type
          // dispatch('updateNotification', response);

          return resolve(response)
        }
      }).catch(error => {
        if (error.response) {
          error.response.type = type
          console.error('error.response', error.response)
          // dispatch('updateNotification', error.response);
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
  POSTItem (dispatch, rootState, payload, endpoint, type) {
    return new Promise((resolve, reject) => {
      console.log('POSTItem payload', payload)
      axios.post('/django/' + endpoint, payload, ).then(response => {
        if (response.status === 201) {
          console.log('API Call from POSTItem')
          response.type = type
          // dispatch('updateNotification', response);

          return resolve(response)
        }
      }).catch(error => {
        if (error.response) {
          error.response.type = type
          console.error('error.response', error.response)
          // dispatch('updateNotification', error.response);
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
	POSTMultipartForm (dispatch, rootState, payload, endpoint, type) {
    return new Promise((resolve, reject) => {
			console.log('POSTMultipartForm payload', payload)
			const formData = new FormData
			for(let key in payload) {
				formData.set(key, payload[key])
			}
			
			axios({
				method: 'post',
				url: '/django/' + endpoint,
				headers: {'Content-Type': 'multipart/form-data'},
				data: formData
    
			}).then(response => {
        if (response.status === 201) {
          console.log('API Call from POSTMultipartForm')
          response.type = type
          // dispatch('updateNotification', response);

          return resolve(response)
        }
      }).catch(error => {
        if (error.response) {
          error.response.type = type
          console.error('error.response', error.response)
          // dispatch('updateNotification', error.response);
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
  GETList (dispatch, rootState, endpoint, type) {
    return new Promise((resolve, reject) => {
      axios.get('/django/' + endpoint).then(response => {
        if (response.status === 200) {
          response.type = type
          console.log('API Call from GETList response', response)
          // dispatch('updateNotification', response)

          return resolve(response)
        }
      }).catch(error => {
        if (error.response) {
					console.error('Error error.message', error.message)
					console.error('Error error.response', error.response)
          error.type = type
          // dispatch('updateNotification', error.response)
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
    return new Promise((resolve, reject) => {
      console.log('GETProfileById payload', payload)
      console.log('GETProfileById endpoint', endpoint)
      console.log('GETProfileById type', type)
      if (!rootState.Auth.isAuthenticated) {
        const error = {}
        error.type = 'Login Required'
        error.status = 2000
        // dispatch("updateNotification", error.response);
        return reject(error)
      }
      axios.get('/django/' + endpoint + payload.id).then(response => {
        if (response.status === 200) {
          response.type = type
          console.log('API Call from GETProfileById')
          // dispatch('updateNotification', response);

          return resolve(response)
        }
      }).catch(error => {
        if (error.response) {
          error.type = type
          // dispatch('updateNotification', error.response);
          return reject(error)
        }
      })
    }).catch(error => {
      return error
    })
	},
	// Filter List of Profiles By Id
  FILTERListById (dispatch, rootState, payload, endpoint, type) {
    return new Promise((resolve, reject) => {
      console.log('FILTERListById payload', payload)
      console.log('FILTERListById endpoint', endpoint)
      console.log('FILTERListById type', type)
      if (!rootState.Auth.isAuthenticated) {
        const error = {}
        error.type = 'Login Required'
        error.status = 2000
        // dispatch("updateNotification", error.response);
        return reject(error)
      }
      axios.get('/django/' + endpoint + payload.id).then(response => {
        if (response.status === 200) {
          response.type = type
          console.log('API Call from FILTERListById')
          // dispatch('updateNotification', response);

          return resolve(response)
        }
      }).catch(error => {
        if (error.response) {
          error.type = type
          // dispatch('updateNotification', error.response);
          return reject(error)
        }
      })
    }).catch(error => {
      return error
    })
  },
  // GET list of items that pertain to a specific platform entity by Filter
  GETFilterList (dispatch, rootState, payload, endpoint, type) {
    return new Promise((resolve, reject) => {
      console.log('GETFilterList payload', payload)
      if (!rootState.Auth.isAuthenticated) {
        const error = {}
        error.type = 'Login Required'
        error.status = 2000
        // dispatch('updateNotification', error.response)
        return reject(error)
			}
			
      // Set the filter based on logged-in user unless different filterURL is passed
      var url = '?merchant='
      if (payload != undefined) {
        url = payload.filterURL
      }
      
			var fullFilterURL = url + payload.id
			if (endpoint === 'superusers-list/') {
        fullFilterURL = ''
			}

      axios.get('/django/' + endpoint + fullFilterURL).then(response => {
        if (response.status === 200) {
          response.type = type
          console.log('API Call from GETFilterList')
          // dispatch('updateNotification', response)

          return resolve(response)
        }
      }).catch(error => {
        if (error.response) {
          error.type = type
          dispatch('updateNotification', error.response)
          return reject(error)
        }
      })
    }).catch(error => {
      return error
    })
  },
  // PATCH Methods
  PATCHItem (dispatch, rootState, payload, endpoint, type) {
    return new Promise((resolve, reject) => {
      console.log('PATCH' + type, payload)
      if (!rootState.Auth.isAuthenticated) {
        const error = {}
        error.type = 'Login Required'
        error.status = 2000
        // dispatch('updateNotification', error.response)
        console.log('PATCHItem error', error)
        return reject(error)
      }
      axios.patch('/django/' + endpoint + payload.id + '/', payload).then(response => {
        console.log('PATCH' + type, response)
        if (response.status === 200) {
          console.log('API Call from PATCHItem')
          response.type = 'Update' + type

          return resolve(response.data)
        }
      }).catch(error => {
        error.type = 'Update Attendance Settings'
        // dispatch('updateNotification', error.response)

        return resolve(error)
      })
    }).catch(error => {
      return error
    })
  },
  PATCHSelectedItem (dispatch, rootState, payload, endpoint, type) {
    return new Promise((resolve, reject) => {
      console.log('PATCH' + type, payload)
      if (!rootState.Auth.isAuthenticated) {
        const error = {}
        error.type = 'Login Required'
        error.status = 2000
        // dispatch('updateNotification', error.response)
        console.log('PATCHItem error', error)
        return reject(error)
      }
      axios.patch('/django/' + endpoint + payload.filterURL + payload.id + '/', payload).then(response => {
        console.log('PATCH' + type, response)
        if (response.status === 200) {
          console.log('API Call from PATCHItem')
          response.type = 'Update' + type

          return resolve(response.data)
        }
      }).catch(error => {
        error.type = 'Update Attendance Settings'
        // dispatch('updateNotification', error.response)

        return resolve(error)
      })
    }).catch(error => {
      return error
    })
  },
  // PATCH DELETE payload.is_active = false
  PATCHDeleteItem (dispatch, rootState, payload, endpoint, type) {
    return new Promise((resolve, reject) => {
      console.log('PATCHDeleteItem', payload)
      if (!rootState.Auth.isAuthenticated) {
        const error = {}
        error.type = 'Login Required'
        error.status = 2000
        dispatch('updateNotification', error.response)
        console.log('PATCHItem error', error)
        return reject(error)
      }
      axios.patch('/django/' + endpoint + payload.id + '/', payload).then(response => {
        console.log('Delete' + type, response)
        if (response.status === 200) {
          console.log('API Call from PATCHDeleteItem')
          response.type = type
          dispatch('updateNotification', response)

          return resolve(response.data)
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
      console.log('DELETE' + type, payload)
      if (!rootState.Auth.isAuthenticated) {
        const error = {}
        error.type = 'Login Required'
        error.status = 2000
        dispatch('updateNotification', error.response)
        console.log('DELETEItem error', error)
        return reject(error)
      }
      axios.delete('/django/' + endpoint + payload.id + '/').then(response => {
        console.log('DELETE' + type, response)
        if (response.status === 204) {
          console.log('API Call from DELETEItem')
          response.type = 'Delete' + type
          dispatch('updateNotification', response)

          return resolve(response.data)
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
