<template>
	<div class="flex justify-center">
		<div class="container login-form">
			<div class="row justify-center">
				<v-col cols="9" md="6" lg="4">
					<v-card
						min-width="300px"
						width="100%">
						<v-card-title class="bg-primary text-white">
							Login
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
						<div class="row justify-center">
							<div class="col-10">
								<v-text-field
									label="Password"
									outlined
									type="password"
									v-model="loginForm.password"
								></v-text-field>
							</div>
						</div>
						<v-card-text>
							<div class="row justify-center">
								<div class="col-11">
									<v-btn
										@click="loginHere"
										color="success"
										width="100%">
										Login here
									</v-btn>
								</div>
							</div>
							<div class="row">
								<div class="col-6"></div>
								<div class="col-6 flex justify-end mt-4">
									<v-btn
										text
										color="secondary"
										x-small
										:to="{name:'Reset'}">
										forgot password
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
  name: 'loginView',
  components: {
  },
  mixins: [

  ],
  data () {
    return {
      // Main Data
      loginForm: {
        username: 'ian@ian.com',
        password: ''
      }

    }
  },
  methods: {
    testButton () {
      console.log('this.Auth.isAuthenticated', this.Auth.isAuthenticated)
      console.log('this.IS_AUTHENTICATED', this.IS_AUTHENTICATED)
    },
    loginHere () {
      this.$store.dispatch('login', this.loginForm)
      console.log('Login')
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
