// Import Vue
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

// console.log("Process", process)
// console.log("Process.env", process.env)
// console.log("axios.defaults.baseURL", axios.defaults.baseURL)

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
