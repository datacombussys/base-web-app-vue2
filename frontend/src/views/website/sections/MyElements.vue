<template>
  <base-section id="my-elements">
    <v-container>
      <v-row>
        <v-col cols="3">
					Col1
					Spinner
					<e-spinner></e-spinner>
					Loader
					<e-loader></e-loader>
        </v-col>
				<v-col cols="3">
						Col2
        </v-col>
				<v-col cols="3">
					Col3
        </v-col>
				<v-col cols="3">
					Col4
        </v-col>
				
      </v-row>
    </v-container>
  </base-section>
</template>

<script>
  export default {
    name: 'SectionMyElements',

    data: () => ({

    }),
  }
</script>
