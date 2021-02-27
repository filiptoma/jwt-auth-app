<template>
	<div class="mx-5 my-10 sm:my-32 sm:w-2/3 sm:mx-auto">
		<div>

			<h1 class="text-3xl sm:text-4xl text-blue-900 font-bold my-10 select-none">Create Post</h1>

			<!-- Form input -->
			<div class="sm:my-16">
				<label for="post" class="font-semibold select-none">What's on your mind?</label>
				<input
					id="post" type="text" name="post"
					class="focus:outline-none w-full text-blue-900 border-b-4 border-gray-200 px-3 py-1"
					v-model="post"
				>
			</div>

			<!-- Form buttons -->
			<div class="flex justify-end my-6 sm:my-16">
				<button
				@click="validateForm"
					class="focus:outline-none hover:bg-blue-700 bg-blue-900 text-white font-bold px-8 py-4"
				><span class="select-none">Create</span></button>
			</div>

		</div>
	</div>
</template>

<script>
import { object, string } from 'yup'
import { mapActions, mapGetters } from 'vuex'

import PostsService from '~/api/services/PostsService'

const postFormSchema = object().shape({
	post: string().required('Please provide all data.')
})

export default {
	transition: 'slide-bottom',
	middleware: 'user',

	data () {
		return {
			post: '',
			error: ''
		}
	},

	methods: {
		...mapActions([
			'showNotification'
		]),

		...mapGetters([
			'accessToken'
		]),

		showFormError () {
			document.getElementById('post').classList.add('border-red-500')
		},

		// validateForm () {
		// 	postFormSchema
		// 		.validate({ post: this.post })
		// 		.then(async () => {
		// 			this.error = ''
		// 			await this.createPost()
		// 			if (!this.error) {
		// 				this.showNotification({
		// 					message: 'Post created!',
		// 					type: 'success'
		// 				})
		// 				this.$router.push('/posts/my')
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
				await postFormSchema.validate({ post: this.post })
				// form values are correct
				this.error = ''
				await this.createPost()
				// if post created successfully
				if (!this.error) {
					this.showNotification({
						message: 'Post created!',
						type: 'success'
					})
					this.$router.push('/posts/my')
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

		async createPost () {
			try {
				const newPost = {
					post: this.post,
					accessToken: this.accessToken()
				}
				// create the post with provided data
				await PostsService.newPost(newPost)
			} catch (err) {
				// invalid provided data
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
