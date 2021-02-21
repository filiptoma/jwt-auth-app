<template>
  <div class="w-11/12 m-auto">
    <h1 class="text-3xl text-center font-bold mt-16 mb-10">Auth App DEMO - using JWT technology</h1>

		<div class="flex flex-wrap justify-center">
			<div class="w-56 border-4 border-purple-200 p-5 m-5">
				<p class="text-lg font-semibold mb-5">Tech stack used</p>
				<ul>
					<li>Nuxt.js - front end</li>
					<li>Express.js - back end</li>
					<li>MongoDB - database</li>
					<li>Yup - form validation</li>
				</ul>
			</div>

			<div class="w-56 border-4 border-purple-200 p-5 m-5">
				<p class="text-lg font-semibold mb-5">Routes</p>
				<ul>
					<li>
						<nuxt-link
							to="/login"
							class="hover:underline"
						>Sign In</nuxt-link>
					</li>
					<li>
						<nuxt-link
							to="/signup"
							class="hover:underline"
						>Create Account</nuxt-link>
					</li>
					<li>
						<nuxt-link
							to="/profile"
							class="hover:underline"
						>My Profile</nuxt-link>
					</li>
				</ul>
			</div>
		</div>

  </div>
</template>
