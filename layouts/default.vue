<template>
  <div class="text-gray-800">
		<!-- <p>{{ { at, atExpiry } }}</p> -->
		<AppHeader />
    <Nuxt />
  </div>
</template>

<script>
import TokenService from '/api/services/TokenService'

import AppHeader from '/components/AppHeader'

export default {
	components: {
		AppHeader
	},

	data () {
		return {
			at: null,
			atExpiry: null,
		}
	},

	async created () {
		// await this.silentRefresh()

		// setInterval(async () => {
		// 	await this.silentRefresh()
		// }, this.atExpiry)
	},

	methods: {
		async silentRefresh () {
			let tokenData = await TokenService.getToken()
			this.at = tokenData.data.testToken
			this.atExpiry = tokenData.data.expiry
		}
	}
}
</script>

<style>
html {
  font-family: 'Catamaran', sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
</style>
