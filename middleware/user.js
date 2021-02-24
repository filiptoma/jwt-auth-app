export default async ({ store, $silentRefresh, redirect }) => {
	// console.log('Processing middleware...')
	// await $silentRefresh()
	if (!store.state.auth.isLoggedIn) {
		store.dispatch('showNotification', {
			message: 'Please sign in first.',
			type: 'error'
		})
		return redirect('/login')
	}
}
