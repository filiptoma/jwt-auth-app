export default ({ store, redirect }) => {
	if (!store.state.auth.isLoggedIn) {
		return redirect('/login')
	}
}
