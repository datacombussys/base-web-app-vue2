
<script>
  // Extensions
  import View from '@/views/website/website-view'

  // Mixins
  import LoadSections from '@/mixins/components/load-sections'

  export default {
    name: 'Home',

    metaInfo: { title: 'Home' },

    extends: View,

    mixins: [
      LoadSections([
				'hero',
        'theme-features',
        'features',
        'contact-us',
        'affiliates',
        'social-media',
        'keep-in-touch',
        'newsletter',
        'pro-features',
        'info',
      ]),
    ],

    props: {
      id: {
        type: String,
        default: 'home',
      },
    },
  }
</script>
