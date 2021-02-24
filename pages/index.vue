<template>
  <div class="mx-5 my-10 sm:my-32">
    <h1 class="text-4xl sm:text-5xl text-center font-bold mt-16 mb-10">
			<span class="text-blue-900">Auth App</span>
			<br />
			<span class="text-2xl sm:text-3xl font-medium">using JWT technology</span>
		</h1>

		<div class="flex flex-wrap justify-center">
			<div class="m-5 sm:m-10">
				<p class="text-2xl text-blue-900 font-bold my-5">Tech stack used</p>
				<ul>
					<li>👉 <span class="font-semibold">Nuxt.js</span> - front end</li>
					<li>👉 <span class="font-semibold">Express.js</span> - back end</li>
					<li>👉 <span class="font-semibold">MongoDB</span> - database</li>
					<li>👉 <span class="font-semibold">Axios</span> - HTTP requests</li>
					<li>👉 <span class="font-semibold">Yup</span> - form validation</li>
				</ul>
			</div>

			<div class="m-5 sm:m-10">
				<p class="text-2xl text-blue-900 font-bold my-5">Routes</p>
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
