<template>
	<div class="mx-5 my-10 sm:my-32 sm:w-2/3 sm:mx-auto">
		<div>

			<h1 class="text-3xl sm:text-4xl text-blue-900 font-bold my-10">Create Post</h1>

			<div class="sm:my-16">
				<label for="post" class="font-semibold">What's on your mind?</label>
				<input
					id="post" type="text" name="post"
					class="focus:outline-none w-full text-blue-900 border-b-4 border-gray-200 px-3 py-1"
					v-model="post"
				>
			</div>

			<div class="flex justify-end my-6 sm:my-16">
				<button
				@click="validateForm"
					class="focus:outline-none bg-blue-900 text-white font-bold px-8 py-4"
				>Create</button>
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

		validateForm () {
			postFormSchema
				.validate({ post: this.post })
				.then(async () => {
					this.error = ''
					await this.createPost()
					if (!this.error) {
						this.showNotification({
							message: 'Post created!',
							type: 'success'
						})
						this.$router.push('/posts/my')
					}
				})
				.catch (err => {
					this.error = err.message
					this.showFormError()
					this.showNotification({
						message: this.error,
						type: 'error'
					})
				})
		},

		async createPost () {
			try {
				const newPost = {
					post: this.post,
					accessToken: this.accessToken()
				}
				await PostsService.newPost(newPost)
			} catch (err) {
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
