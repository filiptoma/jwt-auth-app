<template>
	<main class="mx-5 my-10 sm:my-32 sm:w-2/3 sm:mx-auto">

		<section class="my-10">
			<h1 class="text-3xl sm:text-4xl text-blue-900 font-bold">Some useful web dev resources</h1>
			<h6 class="text-sm">
				Here are some interesting and fairly valuable articles I found while doing this project
			</h6>
		</section>

		<article class="my-20">

			<section
				v-for="(article, index) in articles" :key="index"
				class="border-l-4 border-gray-200 my-10 px-4"
			>
				<a
					:href="article.link" target="_blank"
					class="hover:text-blue-700 text-xl text-blue-900 font-bold"
				>{{ article.name }}</a>
				<p class="">{{ article.desc }}</p>
			</section>

		</article>

	</main>
</template>

<script>
const articles = [
	{
		name: '🍪 Cookies explained',
		desc: 'Very detailed, yet easy to understand explanation of how cookies work and how to set them correctly',
		link: 'https://web.dev/samesite-cookies-explained/'
	}, {
		name: '💻 Handling JWTs on frontend',
		desc: 'Awesome in-depth guide on jsonwebtokens, how to store them on frontend, and how to securely persist access',
		link: 'https://hasura.io/blog/best-practices-of-using-jwt-with-graphql/'
	}, {
		name: '🛡️ Guide to securing Node.js applications',
		desc: 'Article containing all major security threats and how to prevent them',
		link: 'https://dev.to/shaikhshahid/a-guide-to-securing-node-js-applications-4bcc'
	}, {
		name: '🚀 Cookie parsing functions',
		desc: 'Short methods to parse - set/get/delete - cookies on client-side',
		link: 'https://plainjs.com/javascript/utilities/set-cookie-get-cookie-and-delete-cookie-5/'
	}, {
		name: '🚦 Authentication in Nuxt.js',
		desc: `Nuxt.js specific tutorial on how to create small auth app with Nuxt's auth module`,
		link: 'https://www.digitalocean.com/community/tutorials/implementing-authentication-in-nuxtjs-app'
	}
]


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

	data () {
		return {
			articles
		}
	}
}
</script>
