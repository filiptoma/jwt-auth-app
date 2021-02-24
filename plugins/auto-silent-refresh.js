import TokenService from '/api/services/TokenService'

// Executed immediately
export default ({ store }, inject) => {
	const autoSilentRefresh = async (renewAccess, ms) => {
		console.log('=== AUTO SILENT REFRESH - START ===')
		try {
			console.log('Getting user data...')
			const res = await renewAccess()
			console.log('Saving user data...')
			store.dispatch('saveUserData', {
				userData: res.data.userData,
				accessToken: res.data.accessToken
			})
			ms = res.data.expiry
			console.log('=== AUTO SILENT REFRESH - END ===')
			setTimeout(() => autoSilentRefresh(renewAccess, ms), ms)
		} catch (error) { return }
	}

	inject('autoSilentRefresh', autoSilentRefresh(() => TokenService.getToken(), null))
}
