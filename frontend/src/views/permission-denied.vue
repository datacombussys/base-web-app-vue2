<template>
	<div class="flex justify-center">
		Permission Denied.
		Please go back
	</div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'permissionDeniedView',
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

</style>
