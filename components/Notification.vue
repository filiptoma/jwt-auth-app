<template>
	<mark :class="`bg-${color[getNotification.type]}`">
		<p class="text-center text-white font-semibold py-2">
			{{ emoji[getNotification.type] }} {{ getNotification.message }}
		</p>
	</mark>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	name: 'Notification',

	data () {
		return {
			emoji: {
				success: '🎉',
				error: '🤔'
			},
			color: {
				success: 'green-500',
				error: 'red-500'
			}
		}
	},

	computed: {
		...mapGetters([
			'getNotification'
		])
	}
}
</script>
