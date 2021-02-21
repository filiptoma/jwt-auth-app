<template>
	<div class="m-5">
		<div class="flex flex-wrap">

			<section class="mx-10">
				<h1 class="text-2xl font-bold my-5">User info from web token</h1>
				<ul>
					<li>
						<span class="font-bold">Username</span>
						{{ loggedInUser.username }}
					</li>
					<li>
						<span class="font-bold">Is authenticated?</span>
						{{ isAuthenticated }}
					</li>
					<li>
						<span class="font-bold">Part of token</span>
						{{ accessToken.slice(accessToken.length - 20) }}
					</li>
				</ul>
			</section>

			<section class="mx-10">
				<h1 class="text-2xl font-bold my-5">User info from API request</h1>
				<ul>
					<li>
						<span class="font-bold">User ID</span>
						{{ profile._id }}
					</li>
					<li>
						<span class="font-bold">Username</span>
						{{ profile.username }}
					</li>
					<li>
						<span class="font-bold">E-mail</span>
						{{ profile.email }}
					</li>
					<li>
						<span class="font-bold">Password</span>
						{{ profile.password }}
					</li>
					<li>
						<span class="font-bold">Registration date</span>
						{{ profile.registrationDate }}
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
	}
}
</script>
