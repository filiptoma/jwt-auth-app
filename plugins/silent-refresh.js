import TokenService from '/api/services/TokenService'

// Executed after calling this.$silentRefresh()
export default ({ store }, inject) => {
	const silentRefresh = async (renewAccess, ms) => {
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
			setTimeout(() => silentRefresh(renewAccess, ms), ms)
		} catch (error) { return }
	}

	inject('silentRefresh', () => silentRefresh(() => TokenService.getToken(), null))
}
