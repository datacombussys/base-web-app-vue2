import Vue from 'vue'
import App from './App.vue'
import { router } from './routes'

//Vuetify
import vuetify from './plugins/vuetify'
import '@babel/polyfill'

//Import Plugins Modules
import './plugins'

//Store and Subscribers
import store from './store'
require("@/js/subscribers");

//Dev Express
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';

//Custom CSS
import '@/assets/scss/main.scss'
import "@/assets/css/main.css"

//Fonts
import "@/assets/fonts/fonts.css"

//Icons
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

//FontAwesome Icons
//<fa-icon :icon="['far', 'address-book']" size="6x"></fa-icon>
import "@fortawesome/fontawesome-free/js/all" // To be used with <i class="far fa-envelope"></i>
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome';

library.add(fas);
library.add(fab);
library.add(far);

Vue.component('fa-icon', FontAwesomeIcon)
Vue.component('fa-layer', FontAwesomeLayers)
Vue.component('fa-layer-text', FontAwesomeLayersText)

//Lodash
import VueLodash from 'vue-lodash'
import lodash from 'lodash'
Vue.use(VueLodash, { lodash: lodash })

// Vue Moment
Vue.use(require('vue-moment'))
Vue.use(VueLodash, { lodash: lodash })

// Axios
require('@/js/axios')

//Import Vue-Numeral for Number Formatting
import vueNumeralFilterInstaller from 'vue-numeral-filter';
Vue.use(vueNumeralFilterInstaller, { locale: 'en-gb' });

//Custom Filters
require("@/js/filters");

// Numeric Input
import VueNumericInput from 'vue-numeric-input'
Vue.use(VueNumericInput)

//Vue-number-input
import VueNumberInput from '@chenfengyuan/vue-number-input';
Vue.use(VueNumberInput);

//V-Mask
import VueMask from 'v-mask'
Vue.use(VueMask);

//CASL Permissions System
import { abilitiesPlugin } from '@casl/vue';
import ability from './js/permissions-ability';
Vue.use(abilitiesPlugin, ability);
import { Can } from '@casl/vue';
Vue.component('Can', Can);

//Stacked Snackbars
import VSnackbars from "v-snackbars"
Vue.component('stacked-snacks', VSnackbars)

Vue.config.productionTip = false

//import route guards
// require("@/routes/route-guards")

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')



