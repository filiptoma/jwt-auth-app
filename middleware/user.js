export default async ({ store, $silentRefresh, redirect }) => {
	if (!store.state.activeSilentRefresh) {
		await $silentRefresh
	}
	if (!store.state.auth.isLoggedIn) {
		store.dispatch('showNotification', {
			message: 'Please sign in first.',
			type: 'error'
		})
		return redirect('/login')
	}
}
