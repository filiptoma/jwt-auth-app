<template>
	<div class="my-5 sm:my-20">
		<div class="flex flex-wrap">

			<section class="mx-5 sm:mx-10">
				<h1 class="text-3xl sm:text-4xl text-blue-900 font-bold">User info from web token</h1>
				<ul class="my-8">
					<li>
						<span class="text-blue-900 font-bold">Username</span>
						{{ loggedInUser.username }}
					</li>
					<li>
						<span class="text-blue-900 font-bold">Is authenticated?</span>
						{{ isAuthenticated }}
					</li>
					<li>
						<span class="text-blue-900 font-bold">Token</span>
						...{{ accessToken.slice(accessToken.length - 20) }}...
					</li>
				</ul>
			</section>

			<section class="mx-5 sm:mx-10">
				<h1 class="text-3xl sm:text-4xl text-blue-900 font-bold">User info from API request</h1>
				<ul class="my-8">
					<li>
						<span class="text-blue-900 font-bold">User ID</span>
						{{ profile._id }}
					</li>
					<li>
						<span class="text-blue-900 font-bold">Username</span>
						{{ profile.username }}
					</li>
					<li>
						<span class="text-blue-900 font-bold">E-mail</span>
						{{ profile.email }}
					</li>
					<li>
						<span class="text-blue-900 font-bold">Password</span>
						...{{ profile.password.slice(profile.password.length - 20) }}...
					</li>
					<li>
						<span class="text-blue-900 font-bold">Registration date</span>
						{{ parseDate(profile.registrationDate) }}
					</li>
				</ul>
			</section>

		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'

import UserService from '/api/services/UserService'

export default {
	middleware: 'user',

	async asyncData ({ store }) {
		const res = await UserService.myProfileInfo(store.state.auth.accessToken)
		return { profile: res.data.profile }
	},

	computed: {
		...mapGetters([
			'loggedInUser',
			'isAuthenticated',
			'accessToken'
		])
	},

	methods: {
		parseDate (rawDate) {
			const dateAndTime = rawDate.split('T')
			const date = dateAndTime[0].split('-')
			const time = dateAndTime[1].slice(0, -1).split(':')

			return `${date[2]}/${date[1]}/${date[0]}, ${time[0]}:${time[1]} UTC`
		}
	}
}
</script>
