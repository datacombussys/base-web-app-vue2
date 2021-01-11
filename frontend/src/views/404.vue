<template>
  <section id="404 text-center">
    <div class="heading-3" title="404">
			404
		</div>

    <div class="subtitle primary--text">
			Uh Oh!
		</div>

    <div class="subtitle">
    	Looks like this page doesn't exist
		</div>

    <v-img
      :src="require('@/assets/static/RedDangerIcon150x150.png')"
      class="mx-auto mb-12"
      contain
      height="350"
      width="250"
    />

    <div class="text-center">
      <v-btn :to="{ name: 'Home' }">
        Get me Out of Here
      </v-btn>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
	name: '404NotFound',
	 provide: {
		heading: { align: 'center' },
	},
  components: {
  },
  mixins: [

  ],
  data () {
    return {
			// Main Data


    }
  },
  methods: {
    testButton () {

		},



  },
  computed: {
    ...mapState([]),
    ...mapGetters([])

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
