<template>
  <v-app>
    <home-system-bar />

    <home-app-bar />

    <home-view />

    <home-footer />

    <home-settings />
  </v-app>
</template>

<script>
  export default {
    name: 'HomeLayout',

    components: {
      HomeAppBar: () => import('@/layouts/website/AppBar'),
      HomeFooter: () => import('@/layouts/website/Footer'),
      HomeSettings: () => import('@/layouts/website/Settings'),
      HomeSystemBar: () => import('@/layouts/website/SystemBar'),
      HomeView: () => import('@/layouts/website/View'),
    },
  }
</script>
