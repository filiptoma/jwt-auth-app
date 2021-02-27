<template>
  <div class="mx-5 my-10 sm:my-32">

		<!-- App heading -->
    <h1 class="text-4xl sm:text-5xl text-center font-bold mt-16 mb-10">
			<span class="text-blue-900 select-none">Auth App</span>
			<br />
			<span class="text-2xl sm:text-3xl font-semibold">using JWT technology</span>
		</h1>

		<div class="flex flex-wrap justify-center">

			<!-- Tech stack list -->
			<div class="m-5 sm:m-10">
				<p class="text-2xl text-blue-900 font-bold my-5 select-none">Tech stack used</p>
				<ul>
					<li v-for="(tech, index) in techStack" :key="index">
						👉 <span class="font-semibold">{{ tech.name }}</span> - {{ tech.desc }}
					</li>
				</ul>
			</div>

			<!-- Routes list -->
			<div class="m-5 sm:m-10">
				<p class="text-2xl text-blue-900 font-bold my-5 select-none">Routes</p>
				<ul>

					<li class="text-blue-900 text-lg font-bold select-none">Authentication</li>
					<ul class="border-l-4 border-gray-200 mb-5 mt-1 pl-4">
						<li v-for="(route, index) in authRoutes" :key="index">
							<nuxt-link
								:to="route.path"
								class="hover:text-blue-900 select-none"
							>{{ route.name }}</nuxt-link>
						</li>
					</ul>

					<li class="text-blue-900 text-lg font-bold select-none">User Posts</li>
					<ul class="border-l-4 border-gray-200 mt-1 pl-4">
						<li v-for="(route, index) in postsRoutes" :key="index">
							<nuxt-link
								:to="route.path"
								class="hover:text-blue-900 select-none"
							>{{ route.name }}</nuxt-link>
						</li>
					</ul>

				</ul>
			</div>
		</div>

  </div>
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
	}
}
</script>
