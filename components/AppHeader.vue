<template>
	<div>
		<div class="flex justify-between items-center border-b-2 border-gray-200 p-5">

			<!-- Logged in user -->
			<div class="flex flex-col">

				<h1>Using the app as:</h1>

				<div v-if="isAuthenticated">
					<p class="text-xl text-blue-900 font-bold">
						{{ loggedInUser.username }}
					</p>
					<button
						@click="logoutUser"
						class="focus:outline-none border-l-4 border-blue-900 px-2 my-2"
					>Sign Out</button>
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
					class="z-30 sm:hidden hover:underline text-blue-900 font-bold"
				>
					<client-only>
						<unicon v-if="showMenu" name="multiply" fill="#1E3A8A" />
						<unicon v-else name="bars" fill="#1E3A8A" />
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
					@click.native="menuRedirect"
					to="/"
					class="text-blue-900 font-bold m-3"
				>Home</nuxt-link>
				<nuxt-link
					@click.native="menuRedirect"
					to="/login"
					class="text-blue-900 font-bold m-3"
				>Sign In</nuxt-link>
				<nuxt-link
					@click.native="menuRedirect"
					to="/profile"
					class="text-blue-900 font-bold m-3"
				>My Profile</nuxt-link>
			</div>
		</div>

	</div>
</template>

<script>
import { mapGetters } from 'vuex'

import AuthService from '/api/services/AuthService'

export default {
	name: 'AppHeader',

	data () {
		return {
			showMenu: false
		}
	},

	computed: {
		...mapGetters([
			'isAuthenticated',
			'loggedInUser',
			'accessToken'
		]),
	},

	methods: {
		menuRedirect () {
			setTimeout(() => {
				this.showMenu = !this.showMenu
			}, 100)
		},

		async logoutUser () {
			await AuthService.logoutUser()
			console.log('Finished logging out...')
		}
	}
}
</script>
