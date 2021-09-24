<script>
  // Extensions
  import View from '@/views/website/website-view'

  // Mixins
  import LoadSections from '@/mixins/components/load-sections'

  export default {
    name: 'ContactUs',

    metaInfo: { title: 'Contact Us' },

    extends: View,

    mixins: [
      LoadSections([
        'hero-alt',
        'keep-in-touch',
        'map',
        'newsletter',
        'pro-features',
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
