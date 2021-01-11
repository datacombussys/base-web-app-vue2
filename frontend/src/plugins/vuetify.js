import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

import colors from 'vuetify/lib/util/colors'

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
				background: '#FFFFFF',
        primary: '#026379',
        secondary: '#C73103',
        accent: '#06BFEA',
        error: '#F62F2F',
        danger: 'C00202',
        info: '#2196F3',
        success: '#0B9C11',
        warning: '#F9BC04',
        teal: '#02D3DC',
				white: '#FFFFFF',
			},
			dark: {
				background: '#555555',
        primary: '#2196F3',
        secondary: '#424242',
        accent: '#FF4081',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
      },
    },
    icons: {
      iconfont: 'mdi'
    }
  }
})
