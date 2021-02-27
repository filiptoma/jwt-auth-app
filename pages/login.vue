<template>
	<main class="mx-5 my-10 sm:my-32">
		<article class="max-w-md m-auto">

			<h1 class="text-3xl sm:text-4xl text-blue-900 font-bold my-10 select-none">Sign In</h1>

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
					to="/signup"
					class="hover:text-blue-700 text-blue-900 font-semibold select-none"
				>Create Account</nuxt-link>
				<button
					@click="validateForm"
					class="focus:outline-none hover:bg-blue-700 bg-blue-900 text-white font-bold px-8 py-4"
				><span class="select-none">Sign In</span></button>
			</section>

		</article>
	</main>
</template>

<script>
import { object, string } from 'yup'
import { mapActions } from 'vuex'

import AuthService from '~/api/services/AuthService'

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
	transition: 'slide-bottom',
	middleware: 'guest',

	head: {
		title: 'Sign In',
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
			document.getElementById('password').classList.add('border-red-500')
		},

		async validateForm () {
			try {
				await loginFormSchema.validate(this.values)
				// form values are correct
				this.error = ''
				await this.loginUser()
				// if user signed in successfully
				if (!this.error) {
					this.showNotification({
						message: 'Successfully signed in!',
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

		async loginUser () {
			try {
				// login user with provided credentials
				const res = await AuthService.loginUser(this.values)
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
