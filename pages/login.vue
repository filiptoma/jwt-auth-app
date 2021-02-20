<template>
	<div class="text-gray-800 mx-5 my-20">
		<div class="max-w-md m-auto">
			<!-- Form & Loginerrors -->
			<div
				v-show="authError"
				class="bg-red-500"
			>
				<p class="text-center text-white font-semibold py-2">
					{{ authError }}
				</p>
			</div>

			<h1 class="text-2xl font-bold my-6">Sign In</h1>

			<!-- Login form -->
			<div>
				<div class="flex flex-col my-3">
					<label for="username">Username</label>
					<input
						id="username" type="text" name="username"
						class="focus:outline-none border-4 border-purple-200 px-3 py-1"
						v-model="authValues.username"
					/>
				</div>
				<div class="flex flex-col my-3">
					<label for="password">Password</label>
					<input
						id="password" type="password" name="password"
						class="focus:outline-none border-4 border-purple-200 px-3 py-1"
						v-model="authValues.password"
					/>
				</div>
			</div>

			<!-- Form Buttons -->
			<div class="flex justify-between items-center my-6">
				<nuxt-link
					to="/signup"
					class="hover:underline font-semibold"
				>Create Account</nuxt-link>
				<button
					@click="validateForm"
					class="focus:outline-none bg-purple-500 font-semibold text-white px-8 py-4"
				>Sign In</button>
			</div>

		</div>
	</div>
</template>

<script>
import { object, string } from 'yup'
import AuthService from '/api/services/AuthService'

const loginFormSchema = object().shape({
	username: string()
							.required('Incorrect username or password.')
							.min(3, 'Incorrect username or password.').max(15, 'Incorrect username or password.')
							.matches(/^[a-zA-Z0-9._]+$/, 'Incorrect username or password.'),
	password: string()
							.required('Incorrect username or password.')
							.min(6, 'Incorrect username or password.')
})

export default {
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
				await AuthService.loginUser(this.authValues)
			} catch (error) {
				this.authError = error.response.data.message
				this.showAuthError()
			}
		}
	}
}
</script>

<style>

</style>
