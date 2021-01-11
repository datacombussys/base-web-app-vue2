import router from '@/routes'
import store from '@/store/'
console.log('store', store)

router.beforeEach(async (to, from, next) => {
	console.log('store.getters.IS_AUTHENTICATED', store.getters.IS_AUTHENTICATED)
	const userObj = store.getters.GET_USER_PROFILE
	console.log('userObj', userObj)
  if (to.matched.some(record => record.meta.requiresAuth)) {
		// Load User from Local Storage
		if(!store.getters.IS_AUTHENTICATED) {
			let loginProfile = await store.dispatch('preFetchLogin')
			console.log("beforeEach loginProfile", loginProfile)
			if(!loginProfile) {
				next({
					path: '/login',
					query: { redirect: to.fullPath }
				})
			}
		
		} else {
      next()
    } 
  } else {
    next() // make sure to always call next()!
  }
})

//Make it so that only Admin can see admin pages
// if(userObj.is_superuser && to.name.startsWith('Superuser')) {
// 	next()
// } else if(userObj.is_superuser && to.name.startsWith('Superuser')) {
// 	next()
// }else if(userObj.is_admin && to.name.startsWith('Admin')) {
// 	next()
// }else if(userObj.is_teacher && to.name.startsWith('Teacher')) {
// 	next()
// }else if(userObj.is_parent && to.name.startsWith('Parent')) {
// 	next()
// }else if(userObj.is_student && to.name.startsWith('Student')) {
// 	next()
// }else if(userObj.is_vendor && to.name.startsWith('Vendor')) {
// 	next()
// } else {
// 	next({name: 'Permission Denied'})
// }

