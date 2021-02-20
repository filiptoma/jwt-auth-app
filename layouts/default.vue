<template>
  <div>
		<!-- <p>{{ { at, atExpiry } }}</p> -->
    <Nuxt />
  </div>
</template>

<script>
import TokenService from '/api/services/TokenService'

export default {
	data () {
		return {
			at: null,
			atExpiry: null
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
