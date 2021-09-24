<script>
  // Extensions
  import View from '@/views/website/website-view'

  // Mixins
  import LoadSections from '@/mixins/components/load-sections'

  export default {
    name: 'About',

    metaInfo: { title: 'About Us' },

    extends: View,

    mixins: [
      LoadSections([
        'hero-alt',
        'about-our-product',
        'theme-features',
        'affiliates',
        'newsletter',
        'pro-features',
        'info',
      ]),
    ],

    props: {
      id: {
        type: String,
        default: 'about',
      },
    },
  }
</script>
