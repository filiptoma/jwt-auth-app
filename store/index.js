export const state = () => ({
	auth: {
		isLoggedIn: false,
		user: null,
		accessToken: null
	},
	notification: {
		config: null,
		timeoutId: null
	}
})

export const mutations = {
	// Login mutations
	setUser (state, userData) {
		state.auth.user = userData
	},

	setAccessToken (state, newAccessToken) {
		state.auth.accessToken = newAccessToken
	},

	hasLoggedIn (state) {
		state.auth.isLoggedIn = true
	},

	// Logout mutations
	unsetUser (state) {
		state.auth.user = null
	},

	unsetAccessToken (state) {
		state.auth.accessToken = null
	},

	hasLoggedOut (state) {
		state.auth.isLoggedIn = false
	},

	// Other mutations
	setNotification (state, config) {
		state.notification.config = config
	},

	setNotificationTimeout (state, timeoutId) {
		state.notification.timeoutId = timeoutId
	},

	unsetNotification (state) {
		state.notification.config = null
	}
}

export const actions = {
	saveUserData ({ commit }, { userData, accessToken }) {
		commit('setUser', userData)
		commit('setAccessToken', accessToken)
		commit('hasLoggedIn')
	},

	removeUserData ({ commit }) {
		commit('unsetUser')
		commit('unsetAccessToken')
		commit('hasLoggedOut')
	},

	showNotification ({ commit, state }, config) {
		clearTimeout(state.notification.timeoutId)
		commit('setNotification', config)
		const timeoutId = setTimeout(() => {
			commit('unsetNotification')
		}, 4000)
		commit('setNotificationTimeout', timeoutId)
	}
}

export const getters = {
	isAuthenticated (state) {
		return state.auth.isLoggedIn
	},

	loggedInUser (state) {
		return state.auth.user
	},

	accessToken (state) {
		return state.auth.accessToken
	},

	getNotification (state) {
		return state.notification.config
	}
}
