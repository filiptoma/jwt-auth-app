<template>
	<main class="mx-5 my-10 sm:my-32">
		<article class="max-w-md m-auto">

			<h1 class="text-3xl sm:text-4xl text-blue-900 font-bold my-10 select-none">Create Account</h1>

			<!-- Form input -->
			<section>
				<div class="flex flex-col my-3">
					<label for="username" class="font-semibold select-none">Username</label>
					<input
						id="username" type="text" name="username"
						class="focus:outline-none text-blue-900 border-b-4 border-gray-200 px-3 py-1"
						v-model="values.username"
					/>
				</div>
				<div class="flex flex-col my-3">
					<label for="email" class="font-semibold select-none">E-mail</label>
					<input
						id="email" type="email" name="email"
						class="focus:outline-none text-blue-900 border-b-4 border-gray-200 px-3 py-1"
						v-model="values.email"
					/>
				</div>
				<div class="flex flex-col my-3">
					<label for="password" class="font-semibold select-none">Password</label>
					<input
						id="password" type="password" name="password"
						class="focus:outline-none text-blue-900 border-b-4 border-gray-200 px-3 py-1"
						v-model="values.password"
					/>
				</div>
			</section>

			<!-- Form buttons -->
			<section class="flex justify-between space-x-5 items-center my-6">
				<nuxt-link
					to="/login"
					class="hover:text-blue-700 text-blue-900 font-semibold select-none"
				>I have account.</nuxt-link>
				<button
					@click="validateForm"
					class="focus:outline-none hover:bg-blue-700 bg-blue-900 text-white font-bold px-8 py-4"
				><span class="select-none">Sign Up</span></button>
			</section>

		</article>
	</main>
</template>

<script>
import { object, string } from 'yup'
import { mapActions } from 'vuex'

import AuthService from '~/api/services/AuthService'

const registerFormSchema = object().shape({
	username: string()
							.required('Please provide all data.')
							.min(3, 'Username should be 3-15 characters long.').max(15, 'Username should be 3-15 characters long.')
							.matches(/^[a-z0-9._]+$/, 'Username should be lowercase. Numbers . and _ are allowed.'),
	email: string()
							.required('Please provide all data.')
							.email('Invalid e-mail format.'),
	password: string()
							.required('Please provide all data.')
							.min(6, 'Password should be at least 6 characters long.')
})

export default {
	transition: 'slide-bottom',
	middleware: 'guest',

	head: {
		title: 'Create Account',
		meta: [
			{
				hid: 'description',
				name: 'description',
				content: 'Auth App by filiptoma.com - this is an unprotected route.'
			}
		]
	},

	data () {
		return {
			values: {
				username: '',
				email: '',
				password: '',
			},
			error: ''
		}
	},

	methods: {
		...mapActions([
			'saveUserData',  // maps `this.saveLoginData()` to `this.$store.dispatch('saveLoginData')`
			'showNotification'
		]),

		showFormError () {
			document.getElementById('username').classList.add('border-red-500')
			document.getElementById('email').classList.add('border-red-500')
			document.getElementById('password').classList.add('border-red-500')
		},

		// validateForm () {
		// 	registerFormSchema
		// 		.validate(this.values)
		// 		.then(async () => {
		// 			this.error = ''
		// 			await this.registerUser()
		// 			if (!this.error) {
		// 				this.showNotification({
		// 					message: 'Successfully signed in!',
		// 					type: 'success'
		// 				})
		// 				this.$router.push('/')
		// 			}
		// 		})
		// 		.catch (err => {
		// 			this.error = err.message
		// 			this.showFormError()
		// 			this.showNotification({
		// 				message: this.error,
		// 				type: 'error'
		// 			})
		// 		})
		// },

		async validateForm () {
			try {
				await registerFormSchema.validate(this.values)
				// form values are correct
				this.error = ''
				await this.registerUser()
				// if user registered successfully
				if (!this.error) {
					this.showNotification({
						message: 'Successfully created account!',
						type: 'success'
					})
					this.$router.push('/profile')
				}
			} catch (err) {
				// form validation error
				this.error = err.message
				this.showFormError()
				this.showNotification({
					message: this.error,
					type: 'error'
				})
			}
		},

		async registerUser () {
			try {
				// register user with provided credentials
				await AuthService.registerUser(this.values)
				// if success, immediately sign the user in
				const res = await AuthService.loginUser({
					username: this.values.username,
					password: this.values.password
				})
				// save user data into vuex store
				this.saveUserData({
					userData: res.data.userData,
					accessToken: res.data.accessToken
				})
			} catch (err) {
				// invalid credentials
				this.error = err.response.data.message
				this.showFormError()
				this.showNotification({
					message: this.error,
					type: 'error'
				})
			}
		}
	}
}
</script>
