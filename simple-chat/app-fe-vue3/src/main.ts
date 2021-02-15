import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import Toast, { PluginOptions } from "vue-toastification"
import "vue-toastification/dist/index.css"
const options: PluginOptions = {}


import VueUniversalModal from 'vue-universal-modal'
import 'vue-universal-modal/dist/index.css'


const app = createApp(App)
app.use(router)
app.use(Toast, options)

app.use(VueUniversalModal, {
  teleportTarget: '#modals'
})

app.mount('#app')
