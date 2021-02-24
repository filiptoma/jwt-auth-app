<template>
	<div :class="`bg-${getNotification.color}-500`">
		<p class="text-center text-white font-semibold py-2">
			{{ getNotification.message }}
		</p>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	name: 'Notification',

	computed: {
		...mapGetters([
			'getNotification'
		])
	}
}
</script>
