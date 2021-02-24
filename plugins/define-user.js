import TokenService from '~/api/services/TokenService'

// Automatically executed in `client-side Nuxt.js plugin` hook
export default ({ store }, inject) => {
	const defineUser = async (getAccess) => {
		console.log('=== DEFINING USER ===')
		try {
			const res = await getAccess()
			store.dispatch('saveUserData', {
				userData: res.data.userData,
				accessToken: res.data.accessToken
			})
		} catch (error) { return }
	}

	inject('defineUser', defineUser(() => TokenService.getToken()))
}
