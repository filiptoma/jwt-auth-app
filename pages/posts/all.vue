<template>
	<div class="mx-5 my-10 sm:my-32 sm:w-2/3 sm:mx-auto">

		<!-- Heading and sorting info -->
		<div class="my-10">
			<h1 class="text-3xl sm:text-4xl text-blue-900 font-bold select-none">Every post created here</h1>
			<p class="text-sm">
				sorted
				<span class="italic">chronologically</span>
				in
				<span class="italic">descending</span>
				order
			</p>
		</div>

		<!-- All posts -->
		<div v-if="posts.length !== 0">
			<div
				v-for="(post, index) in posts" :key="index"
				class="my-8"
			>
				<h1 class="font-semibold text-lg">
					<span class="text-blue-900 text-2xl font-bold">{{ post.author }}</span>
					wrote at {{ parseMongoDate(post.createDate) }}
				</h1>
				<p class="border-l-4 border-gray-200 px-4 my-2">{{ post.post }}</p>
			</div>
		</div>
		<div v-else>
			<div class="my-16">
				<h1>🤷‍♂️ No posts here... yet!</h1>
			</div>
		</div>

	</div>
</template>

<script>
import PostsService from '~/api/services/PostsService'

export default {
	transition: 'slide-bottom',

	async asyncData () {
		const res = await PostsService.allPosts()
		return { posts: res.data.posts }
	}
}
</script>
