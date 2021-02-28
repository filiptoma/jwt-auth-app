<template>
	<header class="relative">

		<!-- Navbar -->
		<section class="flex justify-between items-center border-b-2 border-gray-200 p-6">

			<!-- Logged in user && Sign out button -->
			<aside class="flex flex-col">

				<h1 class="text-sm">Using the app as:</h1>

				<div v-if="isAuthenticated">
					<p class="text-xl text-blue-900 font-bold">
						{{ loggedInUser.username }}
					</p>
					<button
						@click="logoutUser"
						class="focus:outline-none hover:text-blue-900 font-semibold mt-2 "
					>👋 Sign Out</button>
				</div>
				<p
					v-else
					class="text-xl text-blue-900 font-bold"
				>Guest</p>
			</aside>

			<!-- Navigation routes -->
			<nav class="flex flex-wrap justify-end text-lg">
				<nuxt-link
					to="/"
					class="hidden sm:block hover:text-blue-700 text-blue-900 font-bold mx-3"
				>Home</nuxt-link>
				<nuxt-link
					to="/login"
					class="hidden sm:block hover:text-blue-700 text-blue-900 font-bold mx-3"
				>Sign In</nuxt-link>
				<nuxt-link
					to="/profile"
					class="hidden sm:block hover:text-blue-700 text-blue-900 font-bold mx-3"
				>My Profile</nuxt-link>
				<button
					@click="showMenu = !showMenu"
					class="z-30 sm:hidden focus:outline-none text-blue-900 font-bold px-2 py-1"
				>
					<client-only>
						<unicon v-if="showMenu" name="multiply" fill="#1E3A8A" width="28" height="28" class="mt-2" />
						<unicon v-else name="align-center-alt" fill="#1E3A8A" width="28" height="28" class="mt-2" />
					</client-only>
				</button>
			</nav>
		</section>

		<!-- Menu overlay -->
		<section
			v-show="showMenu"
			class="z-20 h-screen w-screen bg-white"
		>
			<nav class="flex flex-col items-center my-10">
				<nuxt-link
					@click.native="showMenu = !showMenu"
					to="/"
					class="text-blue-900 text-lg font-bold m-3"
				>Home</nuxt-link>
				<nuxt-link
					@click.native="showMenu = !showMenu"
					to="/login"
					class="text-blue-900 text-lg font-bold m-3"
				>Sign In</nuxt-link>
				<nuxt-link
					@click.native="showMenu = !showMenu"
					to="/profile"
					class="text-blue-900 text-lg font-bold m-3"
				>My Profile</nuxt-link>
			</nav>
		</section>

		<!-- Notification -->
		<Notification
			v-if="getNotification"
			class="fixed bottom-0 w-screen z-20"
		/>

	</header>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

import AuthService from '~/api/services/AuthService'

import Notification from '~/components/Notification'

export default {
	name: 'AppHeader',

	components: {
		Notification
	},

	data () {
		return {
			showMenu: false
		}
	},

	computed: {
		...mapGetters([
			'isAuthenticated',
			'loggedInUser',
			'accessToken',
			'getNotification'
		]),
	},

	methods: {
		...mapActions([
			'removeUserData',
			'showNotification'
		]),

		async logoutUser () {
			await AuthService.logoutUser()
			this.removeUserData()
			this.showNotification({
				message: 'Successfully logged out!',
				type: 'success'
			})
			this.$router.push('/')
		},
	}
}
</script>
