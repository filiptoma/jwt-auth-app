<template>
	<div class="border-b-4 border-gray-200">
		<div class="flex flex-col m-5">

			<h1>Using the app as:</h1>

			<div v-if="isAuthenticated">
				<p class="text-lg font-semibold">
					{{ loggedInUser.username }}
				</p>
			</div>

			<p
				v-else
				class="text-lg font-semibold"
			>Guest</p>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	name: 'AppHeader',

	computed: {
		...mapGetters([
			'isAuthenticated',
			'loggedInUser',
			'accessToken'
		]),
	},
}
</script>
