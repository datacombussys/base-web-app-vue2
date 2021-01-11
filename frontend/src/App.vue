<template>
  <v-app>
		<v-app-bar
			app
			color="primary"
			dark
			v-if="showNavBar"
		>
			<template>
				<div class="col-1">
					<v-img
						src="@/assets/static/DatacomLogoSm40x40.png"
						contain
						height="50"
					/>
				</div>
			</template>
			<v-spacer></v-spacer>

				<div class="headline-4">
					Datacom Processing Portal
				</div>

      <v-spacer></v-spacer>
			<div v-if="!Auth.isAuthenticated">
				<v-btn to="/login" color="info">
					Login
					<v-icon class="ml-3">mdi-login</v-icon>
				</v-btn>
			</div>

			<v-menu 
				v-else
				v-model="showMenu"
				absolute
				offset-y
				style="max-width: 600px"
			>
				<template v-slot:activator="{ on, attrs }">
					<div v-if="Auth.fullUserProfile.profile_img">
						<v-card
							rounded="circle"
							:img="Auth.fullUserProfile.profile_img"
							height="50"
							width="50"
							v-bind="attrs"
							v-on="on"
						></v-card>
					</div>
					<div v-else>
						<v-card
							rounded="circle"
							:img="require('./assets/static/UserProfile600x600.png')"
							height="50"
							width="50"
							v-bind="attrs"
							v-on="on"
						></v-card>
					</div>
				</template>

				<v-list>
					<v-list-item
						v-for="(item, index) in items"
						:key="index"
						@click="userMenuClick"
					>
						<v-list-item-title >{{ item.title }}</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-menu>
			

    </v-app-bar>

		<!--No Drawer Content-->

    <v-main>
			<router-view
				@navHome="navHome">
			</router-view>

      <router-view name="main">
			</router-view>

			<template v-if="showDrawer">
				<v-navigation-drawer
					v-model="drawer"
					:mini-variant.sync="mini"
					permanent
					app
					expand-on-hover
					dark
				>
					<router-view :onDrawer="mini" name="left"></router-view>
				</v-navigation-drawer>
			</template>

			<!--Spinner and Preloaders -->
			<v-overlay :value="Notifications.isLoadPanelVisible">
				<div class="row">
					<v-card
						color="blue-grey darken-4"
						class="mx-auto"
						max-width="250"
					>
						<div style="height: 150px;">
							<v-row
								class="fill-height"
								align-content="center"
								justify="center"
							>
								<v-col cols="6">
									<v-progress-linear
										color="deep-orange darken-1"
										indeterminate
										rounded
										height="6"
									></v-progress-linear>
								</v-col>
								<v-col
									class="subtitle-1 text-center"
									cols="12"
								>
									Please wait while we load your data...
								</v-col>
							</v-row>
						</div>
					</v-card>
				</div>
			</v-overlay>

    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'App',

  components: {

  },

  data: () => ({
    // Main Data
    currentRoute: null,
    // Drawer
    mini: true,
    drawer: true,
    showMenu: false,
    items: [
      { title: 'Profile', path: '/profile/admin' },
      { title: 'Notifications' },
      { title: 'Messages', },
      { title: 'Logout' }
    ]
  }),
  methods: {
    testButton () {
      console.log('this.currentRoute', this.currentRoute)
      console.log('this.$route', this.$route)
    },
    navHome (evt) {
      console.log('navHome', evt)
      this.currentRoute = 'Home'
    },
    userMenuClick (evt) {
      console.log('userMenuClick', evt)
      if (evt.target.textContent === 'Logout') {
        this.$store.dispatch('logout')
				this.$router.push('/')
				this.showMenu = false
      } else if(evt.target.textContent === 'Profile') {
				this.$router.push('/profile/admin')
				this.showMenu = false
			} else {
        this.testButton()
      }
    },
    changeCurrentRoute () {
			this.currentRoute = this.$route.name
			console.log('this.currentRoute', this.currentRoute)
			console.log('this.$route', this.$route)
    }

  },
  computed: {
    ...mapState(['Auth', 'Notifications']),
    ...mapGetters([]),
		showDrawer () {
			switch (this.currentRoute) {
				case 'Home':
					return false
					break
				case 'Login':
					return false
					break
				case 'Registration':
					return false
					break
				case 'Checkout':
					return false
					break
				case 'Transaction Result':
					return false
					break
				case 'Products':
					return false
					break
				case 'Product Details':
					return false
					break
				case 'Shopping Cart':
					return false
					break
			}
			return true
		},
			showNavBar () {
			switch (this.currentRoute) {
				case 'Registration':
					return false
					break
				case 'Checkout':
					return false
					break
				case 'Transaction Result':
					return false
					break
				case 'Products':
					return false
					break
				case 'Product Details':
					return false
					break
				case 'Shopping Cart':
					return false
					break
			}
			return true
		},


  },
  watch: {
    '$route.name': function (data) {
      console.log('watch data from $router', data)
      this.changeCurrentRoute()
    }
  },
  beforeCreate () {

	},
	created() {
		// this.$store.dispatch('preFetchLogin')
	},
  async mounted () {
    // this.currentRoute = this.$route.name
    // console.log('mounted this.$route.name', this.$route.name)
  }
}
</script>

<style lang="scss" scoped>
.portrait {
	border-radius: 30px;
}
</style>
