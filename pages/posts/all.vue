<template>
	<main class="mx-5 my-10 sm:my-32 sm:w-2/3 sm:mx-auto">

		<!-- Heading and sorting info -->
		<section class="my-10">
			<h1 class="text-3xl sm:text-4xl text-blue-900 font-bold">Every post created here</h1>
			<h6 class="text-sm">
				sorted
				<span class="italic">chronologically</span>
				in
				<span class="italic">descending</span>
				order
			</h6>
		</section>

		<!-- All posts -->
		<article v-if="posts.length !== 0">
			<section
				v-for="(post, index) in posts" :key="index"
				class="my-8"
			>
				<h4 class="font-semibold text-lg">
					<span class="text-blue-900 text-2xl font-bold">{{ post.author }}</span>
					wrote at {{ parseMongoDate(post.createDate) }}
				</h4>
				<p class="border-l-4 border-gray-200 px-4 my-2">{{ post.post }}</p>
			</section>
		</article>
		<article v-else>
			<section class="my-16">
				<h5>🤷‍♂️ No posts here... yet!</h5>
			</section>
		</article>

	</main>
</template>

<script>
import PostsService from '~/api/services/PostsService'

export default {
	transition: 'slide-bottom',

	head: {
		title: 'All Posts',
		meta: [
			{
				hid: 'description',
				name: 'description',
				content: 'Auth App by filiptoma.com - this is an unprotected route.'
			}
		]
	},

	async asyncData () {
		const res = await PostsService.allPosts()
		return { posts: res.data.posts }
	}
}
</script>
