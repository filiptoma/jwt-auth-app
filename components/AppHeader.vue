<template>
	<div>
		<div class="flex justify-between items-center border-b-2 border-gray-200 p-5">

			<!-- Logged in user info -->
			<div class="flex flex-col">

				<h1 class="text-sm">Using the app as:</h1>

				<div v-if="isAuthenticated">
					<p class="text-xl text-blue-900 font-bold">
						{{ loggedInUser.username }}
					</p>
					<button
						@click="logoutUser"
						class="focus:outline-none font-semibold py-1 my-2"
					>👋 Sign Out</button>
				</div>
				<p
					v-else
					class="text-xl text-blue-900 font-bold"
				>Guest</p>
			</div>

			<!-- Navbar -->
			<div class="flex flex-wrap justify-end text-lg">
				<nuxt-link
					to="/"
					class="hidden sm:block hover:underline text-blue-900 font-bold mx-3"
				>Home</nuxt-link>
				<nuxt-link
					to="/login"
					class="hidden sm:block hover:underline text-blue-900 font-bold mx-3"
				>Sign In</nuxt-link>
				<nuxt-link
					to="/profile"
					class="hidden sm:block hover:underline text-blue-900 font-bold mx-3"
				>My Profile</nuxt-link>
				<button
					@click="showMenu = !showMenu"
					class="z-30 sm:hidden hover:underline text-blue-900 font-bold px-2 py-1"
				>
					<client-only>
						<unicon v-if="showMenu" name="multiply" fill="#1E3A8A" width="28" height="28" />
						<unicon v-else name="align-center-alt" fill="#1E3A8A" width="28" height="28" />
					</client-only>
				</button>
			</div>
		</div>

		<!-- Menu overlay -->
		<div
			v-show="showMenu"
			class="z-20 h-screen w-screen bg-white"
		>
			<div class="flex flex-col items-center my-10">
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
			</div>
		</div>

		<!-- Notification -->
		<Notification v-if="getNotification" />

	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

import AuthService from '/api/services/AuthService'

import Notification from '/components/Notification'

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
