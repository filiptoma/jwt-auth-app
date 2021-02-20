<template>
	<div class="text-gray-800 mx-5 my-20">
		<div class="max-w-md m-auto">
			<!-- Form & Register errors -->
			<div
				v-show="authError"
				class="bg-red-500"
			>
				<p class="text-center text-white font-semibold py-2">
					{{ authError }}
				</p>
			</div>

			<h1 class="text-2xl font-bold my-6">Register</h1>

			<!-- Register form -->
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
					<label for="email">E-mail</label>
					<input
						id="email" type="email" name="email"
						class="focus:outline-none border-4 border-purple-200 px-3 py-1"
						v-model="authValues.email"
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
					to="/login"
					class="hover:underline font-semibold"
				>Already have account?</nuxt-link>
				<button
					@click="validateForm"
					class="focus:outline-none bg-purple-500 font-semibold text-white px-8 py-4"
				>Create Account</button>
			</div>

		</div>
	</div>
</template>

<script>
import { object, string } from 'yup'
import AuthService from '/api/services/AuthService'

const registerFormSchema = object().shape({
	username: string()
							.required('Please provide all data.')
							.min(3, 'Username should be 3-15 characters long.').max(15, 'Username should be 3-15 characters long.')
							.matches(/^[a-zA-Z0-9._]+$/, 'Invalid characters.'),
	email: string()
						.required('Please provide all data.')
						.email('Invalid e-mail format.'),
	password: string()
							.required('Please provide all data.')
							.min(6, 'Password should be at least 6 characters long.')
})

export default {
	data () {
		return {
			authValues: {
				username: '',
				email: '',
				password: '',
			},
			authError: ''
		}
	},
	methods: {
		showAuthError () {
			setTimeout(() => this.authError = '', 4000)
			document.getElementById('username').classList.add('border-red-500')
			document.getElementById('email').classList.add('border-red-500')
			document.getElementById('password').classList.add('border-red-500')
		},
		validateForm () {
			registerFormSchema
				.validate(this.authValues)
				.then(async () => {
					this.authError = ''
					await this.registerUser()
					if (!this.authError) {
						this.$router.push('/')
					}
				})
				.catch (error => {
					this.authError = error.message
					this.showAuthError()
				})
		},
		async registerUser () {
			try {
				await AuthService.registerUser(this.authValues)
				await AuthService.loginUser({
					username: this.authValues.username,
					password: this.authValues.password
				})
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
