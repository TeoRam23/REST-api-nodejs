import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import MotionDetector from './components/MotionDetector.vue'

const app = createApp(App)
app.component('motion-detector', MotionDetector)
app.mount('#app')