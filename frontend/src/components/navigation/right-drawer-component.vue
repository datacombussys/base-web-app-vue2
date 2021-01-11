<template>
	<div>
		<template>
			<!-- Right Drawer -->
			<v-navigation-drawer
				absolute
				right
				temporary
				v-model="openRightDrawer"
			>
				<template v-slot:prepend>
					<div class="title">
						Trading Stuff
					</div>
				</template>

				<v-divider></v-divider>

				<v-list dense>
					<v-list-item
						v-for="item in ForexCryptoStock.forexList"
						:key="item.id"
						@click=""
					>
						<v-list-item-icon>
							<v-icon color="success">mdi mdi-arrow-up-bold</v-icon>
						</v-list-item-icon>

						<v-list-item-content>
							<v-list-item-title>{{ item.symbol }}</v-list-item-title>
							<v-list-item-subtitle>1.2345</v-list-item-subtitle>
						</v-list-item-content>
					</v-list-item>
				</v-list>
			</v-navigation-drawer>
		</template>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import { mapGetters } from 'vuex';
import moment from 'moment';


export default {
  name: 'rightDrawerComponent',
  components: {
		
	},
	mixins: [

	],
	data() {
		return {
			//Main Data
			openRightDrawer: false,

			//vuetify stuff
			sampleItems: [
				{ title: 'Dashboard', icon: 'mdi-view-dashboard' },
				{ title: 'Photos', icon: 'mdi-image' },
				{ title: 'About', icon: 'mdi-help-box' },
			],
		
		}
	},
	methods: {
		testButton() {

		},  

	},
	computed: {
		...mapState(["ForexCryptoStock"]),
		...mapGetters([]),


	},
	mounted() {
		this.$store.dispatch("getForexList")
	}
}
</script>
<style scoped lang="scss">
aside {
	z-index: 10000;
}


</style>
