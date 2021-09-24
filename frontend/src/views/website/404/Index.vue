<script>
  // Extensions
  import View from '@/views/website/website-view'

  // Mixins
  import LoadSections from '@/mixins/components/load-sections'

  export default {
    name: 'FourOhFour',

    metaInfo: { title: 'Oops! No Page Found' },

    extends: View,

    mixins: [
      LoadSections([
        '404',
        'newsletter',
        'info-alt',
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
