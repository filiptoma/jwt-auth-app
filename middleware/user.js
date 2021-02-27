import TokenService from '~/api/services/TokenService'

export default async ({ store, redirect }) => {
	if (!store.state.activeSilentRefresh) {
		store.commit('startSilentRefresh')
		const silentRefresh = async (renewAccess, ms) => {
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
		await silentRefresh(() => TokenService.getToken(), null)
	}

	if (!store.state.auth.isLoggedIn) {
		store.dispatch('showNotification', {
			message: 'Please sign in first.',
			type: 'error'
		})
		return redirect('/login')
	}
}
