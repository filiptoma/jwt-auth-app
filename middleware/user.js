import TokenService from '~/api/services/TokenService'

export default async ({ store, redirect }) => {
	if (!store.state.activeSilentRefresh) {
		store.commit('startSilentRefresh')

		const silentRefresh = async (renewAccess, ms) => {
			try {
				// get new access token with current refresh token as auth state validator
				const res = await renewAccess()
				store.dispatch('saveUserData', {
					userData: res.data.userData,
					accessToken: res.data.accessToken
				})
				// time interval of `silentRefresh`
				ms = res.data.expiry
				// recursively execute `silentRefresh` until user logs out or closes the app
				setTimeout(async () => await silentRefresh(renewAccess, ms), ms)
			} catch (err) {
				return store.commit('stopSilentRefresh')
			}
		}

		// start `silentRefresh`
		await silentRefresh(() => TokenService.getToken(), null)
	}

	if (!store.state.auth.loggedIn) {
		store.dispatch('showNotification', {
			message: 'Please sign in first.',
			type: 'error'
		})
		return redirect('/login')
	}
}
