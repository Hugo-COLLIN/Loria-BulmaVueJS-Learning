import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
//import './assets/custom.scss';
import 'bulma';
import axios from "axios";

// let instance = axios.create({
//     headers: {
//         put: {        // can be common or any other method
//             token: this.$store.state.tokenLogin
//         }
//     }
// })

createApp(App).use(store).use(router).mount('#app')
