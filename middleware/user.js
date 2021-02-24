export default ({ store, redirect }) => {
	if (!store.state.auth.isLoggedIn) {
		store.dispatch('showNotification', {
			message: 'Please sign in first.',
			type: 'error'
		})
		return redirect('/login')
	}
}
