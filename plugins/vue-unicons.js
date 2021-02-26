import Vue from 'vue'
import Unicon from 'vue-unicons/dist/vue-unicons-ssr.common.js'

import {
	uniAlignCenterAlt, uniMultiply
} from 'vue-unicons/src/icons'

import 'vue-unicons/dist/vue-unicons-ssr.css'

Unicon.add([
	uniAlignCenterAlt, uniMultiply
])

Vue.use(Unicon)
