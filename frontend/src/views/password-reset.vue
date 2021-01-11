<template>
	<div class="flex justify-center">
		<div class="container login-form">
			<div class="row justify-center">
				<v-col cols="9" md="6" lg="4">
					<v-card
						min-width="300px"
						width="100%">
						<v-card-title class="bg-primary text-white">
							Forgot Password
						</v-card-title>
						<div class="row justify-center">
							<div class="col-10">
								<v-text-field
									label="Email"
									outlined
									v-model="loginForm.username"
								></v-text-field>
							</div>
						</div>

						<v-card-text>
							<div class="row justify-center">
								<div class="col-11">
									<v-btn
										@click="resetPassword"
										color="secondary"
										width="100%">
										Reset Password
									</v-btn>
								</div>
							</div>


						</v-card-text>
					</v-card>
				</v-col>

			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'passwordReset',
  components: {
  },
  mixins: [

  ],
  data () {
    return {
			// Main Data
			loginForm: {
				username: null
			}


    }
  },
  methods: {
    testButton () {

		},
		resetPassword() {
			console.log("resetPassword")
		}


  },
  computed: {
    ...mapState(['Auth']),
    ...mapGetters(['IS_AUTHENTICATED'])

  },
  mounted () {
  }
}
</script>
<style lang="scss" scoped>
.login-form {
	margin-top: 15vh;
}
</style>
