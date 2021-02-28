<template>
  <main class="mx-5 my-10 sm:my-20">

		<!-- App heading -->
    <section class="text-4xl sm:text-5xl text-center font-bold">
			<h1 class="text-blue-900 my-5">Auth App</h1>
			<h2 class="text-2xl sm:text-3xl font-semibold my-5">using JWT technology</h2>
		</section>

		<article class="flex flex-wrap justify-center my-10">

			<!-- Tech stack list -->
			<section class="m-5 sm:m-10">
				<h3 class="text-2xl text-blue-900 font-bold my-5">Tech stack used</h3>
				<ul>
					<li v-for="(tech, index) in techStack" :key="index">
						👉 <span class="font-semibold">{{ tech.name }}</span> - {{ tech.desc }}
					</li>
				</ul>
			</section>

			<!-- Routes list -->
			<section class="m-5 sm:m-10">
				<h3 class="text-2xl text-blue-900 font-bold my-5">Routes</h3>
				<nav>
					<ul>

						<li class="text-blue-900 text-lg font-bold">Authentication</li>
						<ul class="border-l-4 border-gray-200 mb-5 mt-1 pl-4">
							<li v-for="(route, index) in authRoutes" :key="index">
								<nuxt-link
									:to="route.path"
									class="hover:text-blue-900"
								>{{ route.name }}</nuxt-link>
							</li>
						</ul>

						<li class="text-blue-900 text-lg font-bold">User Posts</li>
						<ul class="border-l-4 border-gray-200 mt-1 pl-4">
							<li v-for="(route, index) in postsRoutes" :key="index">
								<nuxt-link
									:to="route.path"
									class="hover:text-blue-900"
								>{{ route.name }}</nuxt-link>
							</li>
						</ul>

					</ul>
				</nav>
			</section>

		</article>

		<footer class="flex flex-wrap justify-center my-10 sm:my-20">
			<nuxt-link
				to="/about"
				class="hover:text-blue-900 mx-5 sm:mx-10 my-2"
			>How does the Auth App work?</nuxt-link>
			<nuxt-link
				to="/resources"
				class="hover:text-blue-900 mx-5 sm:mx-10 my-2"
			>Some useful articles I collected.</nuxt-link>
		</footer>

  </main>
</template>

<script>
const techStack = [
	{
		name: 'Nuxt.js',
		desc: 'front end'
	}, {
		name: 'Express.js',
		desc: 'back end'
	}, {
		name: 'MongoDB',
		desc: 'database'
	}, {
		name: 'Axios',
		desc: 'HTTP requests'
	}, {
		name: 'Yup',
		desc: 'form validation'
	}, {
		name: 'Tailwind',
		desc: 'CSS'
	}
]

const authRoutes = [
	{
		path: '/login',
		name: 'Sign In'
	}, {
		path: '/signup',
		name: 'Create Account'
	}, {
		path: '/profile',
		name: 'My Profile'
	}
]

const postsRoutes = [
	{
		path: '/posts/new',
		name: 'Create Post'
	}, {
		path: '/posts/my',
		name: 'My Posts'
	}, {
		path: '/posts/all',
		name: 'All Posts'
	}
]


export default {
	data () {
		return {
			techStack,
			authRoutes,
			postsRoutes
		}
	},

	head: {
		title: 'Home',
		meta: [
			{
				hid: 'description',
				name: 'description',
				content: 'Auth App by filiptoma.com - this is an unprotected route.'
			}
		]
	}
}
</script>
