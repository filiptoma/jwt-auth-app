import Vue from 'vue'
import Unicon from 'vue-unicons/dist/vue-unicons-ssr.common.js'

import {
	uniBars, uniMultiply
} from 'vue-unicons/src/icons'

import 'vue-unicons/dist/vue-unicons-ssr.css'

Unicon.add([
	uniBars, uniMultiply
])

Vue.use(Unicon)
