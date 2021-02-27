<template>
	<main class="m-10 sm:my-32 sm:w-2/3 sm:mx-auto">

		<section class="my-10">
			<h1 class="text-3xl sm:text-4xl text-blue-900 font-bold select-none">Well, how does Auth App work?</h1>
			<h6 class="text-sm">Here is how I utilize each module in this project.</h6>
		</section>

		<article class="my-20">

			<!-- Nuxt.js section -->
			<section class="my-16">
				<h2 class="text-2xl text-blue-900 font-bold">Nuxt.js</h2>
				<!-- Description -->
				<section class="my-4">
					<p class="my-2">
						For this project I preferred Nuxt.js framework over pure Vue.js, because I want to have SSR rendered content. With Nuxt, I could have used
						it's official <highlight link="https://auth.nuxtjs.org/">auth module</highlight>, but I want this app to be as independent on external modules
						as possible. I almost got rid of Nuxt's <highlight link="https://axios.nuxtjs.org/">axios module</highlight> too, but unfortunately, I couldn't
						use properly some axios functionalities in server side scripts. But more on that later...
					</p>
					<h3 class="text-lg text-blue-900 font-bold my-2">How do I check if user is authenticated?</h3>
					<p>
						For state management of the application I use no other than
						<highlight link="https://nuxtjs.org/docs/2.x/directory-structure/store">Vuex store</highlight>. My Vuex state contains current access token used
						to authorize user requests, then user info (just username in this case) and whether the user is authenticated or not. Due to my goal to use as
						few npm modules as possible, I also created my own <highlight>notification</highlight> system, which too is managed in Vuex. Lastly regarding Vuex,
						I make use of Nuxt's <highlight>nuxtServerInit</highlight> hook and check if the user should be automatically authenticated immediately after
						coming back to the app, according to his refresh token status in cookie storage.
					</p>
					<h3 class="text-lg text-blue-900 font-bold my-2">And how I keep unwanted visitors away?</h3>
					<p>
						Some routes are protected by Nuxt <highlight>middleware</highlight>. I have two separate middleware methods, one is guest.js which forbids already
						authenticated user from reauthenticating. The second one is user.js and it has two use cases. First, the simple one, is to just redirect
						unauthenticated users to the login page. However, the second use case, is the interesting one. I defined a <highlight>silent refresh</highlight>
						method, which triggers only if there is no silent refresh already happening, and if the user provided the auth server a valid refresh token.
					</p>
					<h3 class="text-lg text-blue-900 font-bold my-2">Huh, silent refresh you say?</h3>
					<p>
						Silent refresh essentialy takes the <highlight>refresh token</highlight> from httpOnly cookie sent automatically in request headers, checks whether
						the token is valid, and if so, returns a new access token, which then the user can use to authorize his requests until it expires again. But the
						magic of silent refresh is that it all happens automatically, without the user ever noticing. It stops only after the user closes the browser window,
						and automatically reinitializes after user comes back to the application.
					</p>
					<p class="my-2">
						This allows us to set low expiration time to access token, and moreover, the access token is <highlight>stored in memory</highlight>, which is the
						safest place to store an access token. Finally, the only way to stop this endless silent refresh loop is to simply log out.
					</p>
				</section>
			</section>

			<!-- Express.js section -->
			<section class="my-16">
				<h2 class="text-2xl text-blue-900 font-bold">Express.js</h2>
				<!-- Description -->
				<section class="my-4">
					<p class="my-2">
						As my backend framework, I chose Express.js, because it is the one I am most familiar with it. It also provides exactly everything I need in this
						project. I have separated the whole authentication server, so I've met some <highlight>CORS</highlight> and <highlight>cookie</highlight> problems,
						which took me some time to figure out. But thanks to the almighty StackOverflow, I managed to get everything to work flawlessly.
					</p>
					<h3 class="text-lg text-blue-900 font-bold my-2">The authorization</h3>
					<p>
						To authorize the user's request, I created a middleware function, which I placed on protected routes. It verifies the access token sent in
						<highlight>Authorization header</highlight> and deals with a request accordingly. For token verification I use <highlight>JWT's verify</highlight>
						method.
					</p>
					<h3 class="text-lg text-blue-900 font-bold my-2">The authentication</h3>
					<p>
						The user authentication process is also pretty simple, yet powerful. During <highlight>registration</highlight>, there is checking if credentials
						provided by user are already being used, hashing the password, and saving user record to the database. <highlight>Login</highlight> flow is fairly
						similar, again there is credential checking, this time whether they match the username and password combination, or not. After that, new refresh and
						access tokens are generted and sent to frontend. Refresh token is also saved to the database, for future access token refreshing. The
						<highlight>logout</highlight> is the simplest of them all, I just delete provided refresh token from the database and clear the httpOnly cookie so
						that it can't be sent in a request anymore.
					</p>
					<p class="my-2">
						The API is a simple <highlight>RESTful</highlight> service, with two separate endpoints. One is /api for resource requests and the other is /auth for
						auth processes. Here are all endpoints listed:
					</p>

						<div class="my-4">
							<h3 class="text-lg text-blue-900 font-bold">API endpoints</h3>
							<h6 class="text-sm">🔒 means it's a protected route on frontend</h6>
						</div>
						<ul>
							<li><span class="font-semibold text-sm">[GET] </span>/api/posts/me - all of current user's posts 🔒</li>
							<li><span class="font-semibold text-sm">[GET] </span>/api/posts/all - all posts in database</li>
							<li><span class="font-semibold text-sm">[POST] </span>/api/posts/new - create new post 🔒</li>
							<div class="my-2"></div>
							<li><span class="font-semibold text-sm">[GET] </span>/api/user/me - current user data from database 🔒</li>
						</ul>

						<div class="my-4">
							<h3 class="text-lg text-blue-900 font-bold">AUTH endpoints</h3>
							<h6 class="text-sm">☝️ auth server is on port 4000</h6>
						</div>
						<ul>
							<li><span class="font-semibold text-sm">[POST] </span>/auth/register - registration process</li>
							<li><span class="font-semibold text-sm">[POST] </span>/auth/login - login process</li>
							<li><span class="font-semibold text-sm">[DELETE] </span>/auth/logout - logout process</li>
							<div class="my-2"></div>
							<li><span class="font-semibold text-sm">[GET] </span>/auth/token - get new access token</li>
						</ul>

				</section>
			</section>

			<!-- MongoDB section -->
			<section class="my-16">
				<h2 class="text-2xl text-blue-900 font-bold">MongoDB</h2>
				<!-- Description -->
				<section class="my-4">
					<p class="my-2">
						MongoDB is so far my favourite database, so there wasn't really much deciding. I speculated about using GraphQL for this project, but decided to
						rather make separate gql project. With MongoDB I use <highlight link="https://www.npmjs.com/package/mongoose">mongoose</highlight> package, as it
						provides much more organised and structured way to write queries and define collection schemas.
					</p>
					<p class="my-2">
						This project has simple schema setup, I have 3 collections, one for storing users and their data, one for storing posts, and one for storing active
						refresh tokens. I played around with the idea of storing black listed tokens, but decided not to include it.
					</p>
				</section>
			</section>

			<!-- Axios section -->
			<section class="my-16">
				<h2 class="text-2xl text-blue-900 font-bold">Axios</h2>
				<!-- Description -->
				<section class="my-4">
					<p class="my-2">
						I use axios to make asynchronous HTTP requests to my API and AUTH endpoints. As I said earlier, I almost got rid of Nuxt's
						<highlight>axios module</highlight>. Don't get me wrong, it is awesome, combined with proxy module, it makes development much easier, but I
						personally prefer to have my API services all in one place (see /api/services) and that is impossible with Nuxt's axios module.
					</p>
					<p class="my-2">
						However, I had one problem with pure axios. To this day I'm not able what caused that problem. In my <highlight>nuxtServerInit</highlight> hook, when
						I used imported axios, my auth server did not see any cookie headers in the request, but after using <highlight>this.$axios</highlight>, everything
						worked as it should. Well, maybe someday I will find an explanation...
					</p>
				</section>
			</section>

			<!-- Other section -->
			<section class="my-16">
				<h2 class="text-2xl text-blue-900 font-bold">Other</h2>
				<!-- Description -->
				<section class="my-4">
					<h3 class="text-lg text-blue-900 font-bold my-2">Yup</h3>
					<p>
						To validate form inputs, I had two options. I could use <highlight link="https://www.npmjs.com/package/joi">joi</highlight> package to validate
						input on my server, or use <highlight link="https://www.npmjs.com/package/yup">Yup</highlight> package, to do the exact same thing, but on the
						client-side. I chose Yup, because the purpose of this project isn't to make a perfect API which handles all kinds of requests, such as invalid form
						data from tools like <highlight link="https://www.postman.com/">Postman</highlight>.
					</p>
					<h3 class="text-lg text-blue-900 font-bold my-2">TailwindCSS</h3>
					<p>
						Tailwind is... Is just a👏we👏so👏me👏!!! I really can't recommend it enough. It makes writing CSS so, so enjoyable! (and it comes from a person who
						really doesn't enjoy designing). Go check it out!
					</p>
				</section>
			</section>

			<!-- Contact Me -->
			<section class="my-16">
				<p>
					That is all, if you have any more questions, or you want me to explain something more in-depth to you, feel free to contact me.
				</p>
				<p class="select-all my-2">
					<highlight>itsfiliptoma@gmail.com</highlight>
				</p>
			</section>

		</article>

	</main>
</template>

<script>
import Highlight from '~/components/Highlight'

export default {
	transition: 'slide-bottom',

	head: {
		title: 'About the project',
		meta: [
			{
				hid: 'description',
				name: 'description',
				content: 'Auth App by filiptoma.com - this is an unprotected route.'
			}
		]
	},

	components: {
		Highlight
	}
}
</script>
