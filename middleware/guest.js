export default ({ store, redirect }) => {
	if (store.state.auth.loggedIn) {
		store.dispatch('showNotification', {
			message: 'You are already signed in.',
			type: 'error'
		})
		return redirect('/')
	}
}
