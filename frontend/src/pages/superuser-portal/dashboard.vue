<template>
	<div class="flex justify-center">
		<div class="container">
			<div class="headline-3">Superuser Dashboard</div>
			<!-- Main Container Row -->
			<div class="row">
				<!-- Main Content Left Area -->
				<div class="col-8">
					<DxScrollView
						:scroll-by-content="true"
						:scroll-by-thumb="true"
						show-scrollbar="onHover"
						height="80vh"
					>
						<template>
							<div class="row mt-4 justify-center">
								<v-card
									class="p-4 mx-6 my-4"
									max-width="200"
									elevation="5"
								>
									<div class="row mt-2">
										<div class="col-12 p-0 flex justify-center">
											<div class="dashboard-number">
												3,250
											</div>
										</div>
									</div>
									<div class="row mt-4">
										<div class="col-12 p-0 text-center">
											<div class="headline-5">
												Students
											</div>
										</div>
									</div>
								</v-card>

								<v-card
									class="p-4 mx-6 my-4"
									max-width="200"
									elevation="5"
								>
									<div class="row mt-2">
										<div class="col-12 p-0 flex justify-center">
											<div class="dashboard-number">
												22
											</div>
										</div>
									</div>
									<div class="row mt-4">
										<div class="col-12 p-0 text-center">
											<div class="headline-5">
												Teachers
											</div>
										</div>
									</div>
								</v-card>

								<v-card
									class="p-4 mx-6 my-4"
									max-width="200"
									elevation="5"
								>
									<div class="row mt-2">
										<div class="col-12 p-0 flex justify-center">
											<div class="dashboard-number">
												3,250
											</div>
										</div>
									</div>
									<div class="row mt-4">
										<div class="col-12 p-0 text-center">
											<div class="headline-5">
												Parents
											</div>
										</div>
									</div>
								</v-card>

								<v-card
									class="p-4 mx-6 my-4"
									max-width="200"
									elevation="5"
								>
									<div class="row mt-2">
										<div class="col-12 p-0 flex justify-center">
											<div class="dashboard-number">
												425
											</div>
										</div>
									</div>
									<div class="row mt-4">
										<div class="col-12 p-0 text-center">
											<div class="headline-5">
												Vendors
											</div>
										</div>
									</div>
								</v-card>

							</div>
						</template>
						<template>
							<div class="row">
								<div class="col-12">
									<v-card>
										<v-card-title class="bg-datacom text-white">
											History
										</v-card-title>
										<v-tabs v-model="vTab">
											<v-tabs-slider></v-tabs-slider>

											<v-tab>Sales Orders</v-tab>
											<v-tab>Purchase Orders</v-tab>
											<v-tab>Payments</v-tab>

											<!-- Tab 1 -->
											<v-tab-item>
												<v-list-item>
													<v-list-item-content>
														<div class="row bg-gray-300 p-3 mb-2">
															<div class="col-4 p-0 flex items-center justify-center">
																<div class="header-font">
																	Student
																</div>
															</div>
															<div class="col-4 p-0 flex items-center justify-center">
																<div class="header-font">
																	Amount
																</div>
															</div>
															<div class="col-4 p-0 flex items-center justify-center">
																<div class="header-font">
																	Status
																</div>
															</div>
														</div>
														<v-list-item-title>
															<div class="row">
																<div class="col-4 p-0 pl-3">
																	Eloise Greene
																	<v-list-item-subtitle>
																		<div class="row">
																			Books and Supplies
																		</div>
																	</v-list-item-subtitle>
																</div>
																<div class="col-4 p-0 flex items-center justify-center">
																	<div class="headline-6">
																		$145.25
																	</div>
																</div>
																<div class="col-4 p-0 flex items-center justify-center">
																	<v-chip
																		class="m-2"
																		label
																		color="success"
																	>
																		APPROVED
																	</v-chip>
																</div>
															</div>
														</v-list-item-title>
													</v-list-item-content>
												</v-list-item>

												<v-list-item>
													<v-list-item-content>
														<v-list-item-title>
															<div class="row">
																<div class="col-4 p-0 pl-3">
																	Charlie Brown
																	<v-list-item-subtitle>
																		<div class="row">
																			Books and Supplies
																		</div>
																	</v-list-item-subtitle>
																</div>
																<div class="col-4 p-0 flex items-center justify-center">
																	<div class="headline-6">
																		$145.25
																	</div>
																</div>
																<div class="col-4 p-0 flex items-center justify-center">
																	<v-chip
																		class="m-2"
																		label
																		color="error"
																	>
																		DECLINED
																	</v-chip>
																</div>
															</div>
														</v-list-item-title>
													</v-list-item-content>
												</v-list-item>
											</v-tab-item>

											<!-- Tab 2 -->
											<v-tab-item>
												Content for 2 tab
											</v-tab-item>

											<!-- Tab 3 -->
											<v-tab-item>
												Content for 3 tab
											</v-tab-item>
										</v-tabs>
									</v-card>

								</div>
							</div>
						</template>
					</DxScrollView>
				</div>
				<!-- Sidebar Right -->
				<div class="col-4">
					<v-card
						class="py-5 mx-6 my-4"
						max-width="450"
						min-width="300"
						max-height="80vh"
						elevation="5"
					>
					<div class="headline-5 px-3">
						Messages
					</div>
						<div class="row mt-2">
							<div class="col-12 p-0 flex justify-center">
								<DxScrollView
									:scroll-by-content="true"
									:scroll-by-thumb="true"
									show-scrollbar="onHover"
									height="70vh"
								>

									<v-list three-line>
										<template v-for="(item, index) in items">
											<v-subheader
												v-if="item.header"
												:key="item.id"
												v-text="item.header"
											></v-subheader>

											<v-divider
												v-else-if="item.divider"
												:key="index"
												:inset="item.inset"
											></v-divider>

											<v-list-item
												v-else
												:key="item.id"
												@click=""
											>
												<v-list-item-avatar>
													<v-img :src="item.avatar"></v-img>
												</v-list-item-avatar>

												<v-list-item-content>
													<v-list-item-title v-html="item.title"></v-list-item-title>
													<v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
												</v-list-item-content>
											</v-list-item>
										</template>
									</v-list>

								</DxScrollView>

							</div>
						</div>
					</v-card>
				</div>

			</div>
			<!-- END Main Container Row -->
			<!--Bottomr Row -->

		</div>
	</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import moment from 'moment'

// Devexpress
import { DxScrollView } from 'devextreme-vue/scroll-view'

export default {
  name: 'superuserDashboard',
  components: {
    DxScrollView
  },
  mixins: [

  ],
  props: {

  },
  data () {
    return {
      // Main Data
      vTab: null,
      items: [
        { header: 'Today' },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Brunch this weekend?',
          subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
          subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend."
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Oui oui',
          subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Birthday gift',
          subtitle: "<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?"
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'Recipe to try',
          subtitle: "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Brunch this weekend?',
          subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
          subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend."
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Oui oui',
          subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Birthday gift',
          subtitle: "<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?"
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'Recipe to try',
          subtitle: "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
        }
      ]
    }
  },
  methods: {
    testButton () {

    }

  },
  computed: {
    ...mapState([]),
    ...mapGetters([])

  },
  mounted () {

  }
}
</script>
<style scoped lang="scss">

</style>
