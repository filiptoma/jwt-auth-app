<template>
	<div class="mx-5 my-10 sm:my-32">
		<div class="max-w-md m-auto">

			<AuthError :message="authError" v-if="authError" />

			<h1 class="text-3xl sm:text-4xl text-blue-900 font-bold my-10">Sign In</h1>

			<!-- Login form -->
			<div>
				<div class="flex flex-col my-3">
					<label for="username" class="font-semibold">Username</label>
					<input
						id="username" type="text" name="username"
						class="focus:outline-none text-blue-900 border-b-4 border-gray-200 px-3 py-1"
						v-model="authValues.username"
					/>
				</div>
				<div class="flex flex-col my-3">
					<label for="password" class="font-semibold">Password</label>
					<input
						id="password" type="password" name="password"
						class="focus:outline-none text-blue-900 border-b-4 border-gray-200 px-3 py-1"
						v-model="authValues.password"
					/>
				</div>
			</div>

			<!-- Form Buttons -->
			<div class="flex justify-between space-x-5 items-center my-6">
				<nuxt-link
					to="/signup"
					class="hover:underline text-blue-900 font-semibold"
				>Create Account</nuxt-link>
				<button
					@click="validateForm"
					class="focus:outline-none bg-blue-900 text-white font-bold px-8 py-4"
				>Sign In</button>
			</div>

		</div>
	</div>
</template>

<script>
import { object, string } from 'yup'
import { mapActions } from 'vuex'

import AuthService from '/api/services/AuthService'

import AuthError from '/components/AuthError'

const loginFormSchema = object().shape({
	username: string()
							.required('Incorrect username or password.')
							.min(3, 'Incorrect username or password.')
							.max(15, 'Incorrect username or password.')
							.matches(/^[a-zA-Z0-9._]+$/, 'Incorrect username or password.'),
	password: string()
							.required('Incorrect username or password.')
							.min(6, 'Incorrect username or password.')
})

export default {
	middleware: 'guest',

	components: {
		AuthError
	},

	data () {
		return {
			authValues: {
				username: '',
				password: '',
			},
			authError: ''
		}
	},

	methods: {
		...mapActions([
			'saveLoginData'  // maps `this.saveLoginData()` to `this.$store.dispatch('saveLoginData')`
		]),

		showAuthError () {
			setTimeout(() => this.authError = '', 4000)
			document.getElementById('username').classList.add('border-red-500')
			document.getElementById('password').classList.add('border-red-500')
		},

		validateForm () {
			loginFormSchema
				.validate(this.authValues)
				.then(async () => {
					this.authError = ''
					await this.loginUser()
					if (!this.authError) {
						this.$router.push('/')
					}
				})
				.catch (error => {
					this.authError = error.message
					this.showAuthError()
				})
		},

		async loginUser () {
			try {
				const res = await AuthService.loginUser(this.authValues)
				this.saveLoginData({
					userData: res.data.userData,
					accessToken: res.data.accessToken
				})
			} catch (error) {
				this.authError = error.response.data.message
				this.showAuthError()
			}
		}
	}
}
</script>
