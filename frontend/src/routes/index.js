import Vue from 'vue'
import VueRouter from 'vue-router'
import Router from 'vue-router'
import store from '@/store/'

//Import NavLinks
import { web, main, superuser, merchant } from "@/routes/app-navigation"
console.log('store', store)

store._modules.root.state.Notifications.isLoadPanelVisible = true

//Load User First
var varMenu = null;
export const userProfile = async () => {
	return new Promise(async (resolve, reject) => {
		var User
		console.log('store.getters.GET_USER_PROFILE', store.getters.GET_USER_PROFILE)
		User = await store.dispatch('GETUserProfile')
		console.log("User", User)
		console.log('store.getters.GET_USER_PROFILE 2', store.getters.GET_USER_PROFILE)

		return resolve(User)
	})
}

import Home from '../views/Home'
import Login from '../views/login-view'
import PermissionDenied from '../views/permission-denied'
import Reset from '../views/password-reset'
import leftDrawer from '@/components/navigation/left-drawer-component'

// Superuser pages
import superUserDashboard from '@/pages/superuser-portal/dashboard'

// Merchant pages
import merchantDashboard from '@/pages/merchant-portal/dashboard'


//404 Not Found
import NotFound from "@/views/404"

Vue.use(VueRouter)

export const router = new VueRouter({
  mode: 'history',
	base: process.env.BASE_URL,
	scrollBehavior: (to, from, savedPosition) => {
    if (to.hash) return { selector: to.hash }
    if (savedPosition) return savedPosition

    return { x: 0, y: 0 }
	},
  routes: [
		{
      path: '/',
      component: () => import('@/layouts/home/Index.vue'),
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('@/views/home/Index.vue'),
        },
        {
          path: 'about',
          name: 'About',
          component: () => import('@/views/about/Index.vue'),
          meta: { src: require('@/assets/static/web/about.jpg') },
        },
        {
          path: 'contact-us',
          name: 'Contact',
          component: () => import('@/views/contact-us/Index.vue'),
          meta: { src: require('@/assets/static/web/contact.jpg') },
        },
        {
          path: 'pro',
          name: 'Pro',
          component: () => import('@/views/pro/Index.vue'),
          meta: { src: require('@/assets/static/web/pro.jpg') },
        },
        {
          path: '*',
          name: 'FourOhFour',
          component: () => import('@/views/404/Index.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
		},
		{
      path: '/password-reset',
      name: 'Password Reset',
      component: Reset
		},
		{
      path: '/denied',
      name: 'Permission Denied',
      component: PermissionDenied
    },
    {
      path: '/secured',
      name: 'Secured',
			component: Login,
			beforeEnter: (to, from, next) => {
				console.log("from", from)
				console.log("to", to)
				console.log("store", store)
				console.log("store.getters.GET_USER_PROFILE", store.getters.GET_USER_PROFILE)
				
				if (from.name === 'Login' && store.getters.GET_USER_PROFILE.is_superuser) next({ name: 'Superuser', replace: true })
				else if(from.name === 'Login' && store.getters.GET_USER_PROFILE.is_merchant) next({ name: 'Merchant', replace: true })
				else if(from.name === null) next({ path: from.query.redirect, replace: true })
				// else	next({name:to.query, replace: true})
				else next()
			}
		},
		{
      path: '/superuser',
      name: 'Superuser',
			meta: { requiresAuth: true,
				checkPermissions: false },
      components: {
        main: superUserDashboard,
        left: leftDrawer
      }
		},
	
    // Merchant Pages
    {
      path: '/merchant',
      name: 'Merchant',
      meta: { requiresAuth: true,
				checkPermissions: false },
      components: {
        main: merchantDashboard,
        left: leftDrawer
			}
		},		
		{
			// matches everything else  
			path: '*',
			name: '404',
			component: NotFound
		}
  ]
})

//* *****************Route Guards**************************** */

router.beforeEach(async (to, from, next) => {
	console.log("User checkRoutes2")
	console.log("to", to)
	console.log("from", from)

	// const userData = await userProfile()
	// console.log('userData', userData)

	// if(userData) {
	// 	if(to.matched.some(record => record.meta.navBar === 'variable')) {
	// 		if(userData.is_merchant) {
	// 			to.meta.navBar = JSON.parse(JSON.stringify(merchant))
	// 		} else {
	// 			to.meta.navBar = JSON.parse(JSON.stringify(superuser))
	// 		}
	// 	}
	// }

	store._modules.root.state.Notifications.isLoadPanelVisible = false

	if (to.matched.some(record => record.meta.requiresAuth)) {
		
		// console.log('store.getters.IS_AUTHENTICATED', store.getters.IS_AUTHENTICATED)
		// console.log('store.getters.GET_FULL_PROFILE', store.getters.GET_FULL_PROFILE)
		// const fullProfile = store.getters.GET_FULL_PROFILE
		// var hasFullProfile = false
		// if(fullProfile) {
		// 	hasFullProfile = Object.keys(fullProfile).length != 0
		// 	console.log('hasFullProfile', hasFullProfile)
		// }
		
		
		// Load User from Local Storage if not authenticated
		if(!store.getters.IS_AUTHENTICATED) {
			console.log("User2", userData)

			if(userData === undefined ||Object.keys(userData).length === 0) {

				next({
					path: '/login',
					query: { redirect: to.fullPath }
				})
			
			} else {
				if(!hasFullProfile) {
					await store.dispatch('preFetchLogin', userData)
				}
				next()
			} 
		} else {
			if(!hasFullProfile) {
				console.log("TRUE hasFullProfile")
				await store.dispatch('preFetchLogin', userData)
			}
			next()
		}
	} else {
		next() // make sure to always call next()!
	}
})



