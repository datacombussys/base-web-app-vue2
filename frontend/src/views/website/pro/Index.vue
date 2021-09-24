<script>
  // Extensions
  import View from '@/views/website/website-view'

  // Mixins
  import LoadSections from '@/mixins/components/load-sections'

  export default {
    name: 'Pro',

    metaInfo: { title: 'Pro Features' },

    extends: View,

    mixins: [
      LoadSections([
        'hero-alt',
        'pro-features',
      ]),
    ],

    props: {
      id: {
        type: String,
        default: 'pro',
      },
    },
  }
</script>
