<template>
	<div>
		<template>
			<!-- Left Drawer -->
			<div v-if="onDrawer" class="row mt-12">

			</div>
			<div class="row">
				<div class="col-12 my-7">
					<div v-if="!onDrawer" class="headline-3 text-center text-white">
						{{navRoute[0].toUpperCase() + navRoute.substring(1)}}
					</div>
					<div v-if="!onDrawer" class="headline-5 text-center text-white m-0">
						Linda Johnson
					</div>
				</div>
			</div>
	

			<v-divider></v-divider>

			<v-list dense>
				<router-link 
					v-for="item in items"
					:key="item.id"
					:to="item.path"
					active-class>

						<v-list-item
							:class="{activeClass: navRoute == item.name}"
							@click="selectMenuItem"
						>
							<v-list-item-icon color="primary">
								<v-icon>{{ item.icon }}</v-icon>
							</v-list-item-icon>

							<v-list-item-content>
								<v-list-item-title>{{ item.title }}</v-list-item-title>
							</v-list-item-content>
						</v-list-item>

				</router-link>
				
			</v-list>
		</template>


	</div>
</template>

<script>
import { mapState } from 'vuex';
import { mapGetters } from 'vuex';
import moment from 'moment';

//Import NavLinks
import { main } from "@/routes/app-navigation"
import { superuser } from "@/routes/app-navigation"
import { merchant } from "@/routes/app-navigation"


export default {
  name: 'leftDrawerComponent',
  components: {
	},
	mixins: [

	],
	props: {
		onDrawer: {
			type: Boolean,
			required: true
		}
	},
	data() {
		return {
			//Main Data
			openLeftDrawer: false,
			navRoute: null,
			//vuetify stuff
			items: main,

			item: 1
		}
	},
	methods: {
		testButton() {

		},
		selectMenuItem(evt) {
			console.log("activeClass evt", evt)
		}

	},
	computed: {
		...mapState([]),
		...mapGetters([]),
		activeClass(evt) {
		console.log("activeClass evt", evt)
		}

	},
	watch: {

	},
	mounted() {
		this.navRoute = this.$route.name
		switch(this.navRoute) {
			case "Superuser":
				this.items = superuser
				break
			case "Merchant":
				this.items = merchant
				break
			case "Home":
				this.items = main
				break
		}
		console.log("this.$route.name", this.$route.name)


	}
}
</script>
<style scoped lang="scss">
aside {
	z-index: 10000;
}


</style>
