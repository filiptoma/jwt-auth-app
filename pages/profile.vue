<template>
	<div class="mx-5 my-10 sm:my-32 sm:w-2/3 sm:mx-auto">

			<section class="mb-16">
				<h1 class="text-3xl sm:text-4xl text-blue-900 font-bold my-6">User info from web token</h1>
				<ul>
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

			<section>
				<h1 class="text-3xl sm:text-4xl text-blue-900 font-bold my-6">User info from API request</h1>
				<ul>
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
						{{ parseMongoDate(profile.registrationDate) }}
					</li>
				</ul>
			</section>

	</div>
</template>

<script>
import { mapGetters } from 'vuex'

import UserService from '/api/services/UserService'

export default {
	transition: 'slide-bottom',
	middleware: 'user',

	async asyncData ({ store }) {
		const res = await UserService.myProfile(store.state.auth.accessToken)
		return { profile: res.data.profile }
	},

	computed: {
		...mapGetters([
			'loggedInUser',
			'isAuthenticated',
			'accessToken'
		])
	}
}
</script>
