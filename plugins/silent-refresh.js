import TokenService from '~/api/services/TokenService'

// Manually executed by calling `$silentRefresh()`
export default ({ store }, inject) => {
	const silentRefresh = async (renewAccess, ms) => {
		console.log('=== SILENT REFRESH ===')
		try {
			const res = await renewAccess()
			store.dispatch('saveUserData', {
				userData: res.data.userData,
				accessToken: res.data.accessToken
			})
			ms = res.data.expiry
			setTimeout(async () => await silentRefresh(renewAccess, ms), ms)
		} catch (error) {
			return store.commit('stopSilentRefresh')
		}
	}

	const startSilentRefresh = async () => {
		store.commit('startSilentRefresh')
		await silentRefresh(() => TokenService.getToken(), null)
	}

	inject('silentRefresh', startSilentRefresh)
}
