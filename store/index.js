export const state = () => ({
	auth: {
		loggedIn: false,
		user: null,
		accessToken: null
	},
	notification: {
		config: null,
		timeoutId: null
	},
	activeSilentRefresh: false
})

export const mutations = {
	// login mutations
	setUser (state, userData) {
		state.auth.user = userData
	},

	setAccessToken (state, newAccessToken) {
		state.auth.accessToken = newAccessToken
	},

	setUserStatus (state) {
		state.auth.loggedIn = true
	},

	// logout mutations
	unsetUser (state) {
		state.auth.user = null
	},

	unsetAccessToken (state) {
		state.auth.accessToken = null
	},

	unsetUserStatus (state) {
		state.auth.loggedIn = false
	},

	// notification mutations
	setNotification (state, config) {
		state.notification.config = config
	},

	setNotificationTimeout (state, timeoutId) {
		state.notification.timeoutId = timeoutId
	},

	unsetNotification (state) {
		state.notification.config = null
	},

	// silent refresh mutations
	startSilentRefresh (state) {
		state.activeSilentRefresh = true
	},

	stopSilentRefresh (state) {
		state.activeSilentRefresh = false
	}
}

export const actions = {
	// automatically runs at `nuxtServerInit` hook
	// refer Nuxt.js lifecycle hooks docs
	async nuxtServerInit ({ dispatch }, { req }) {
		try {
			// using `@nuxtjs/axios` module
			// with `~/api/services/TokenService.getToken()` the cookie header isn't sent
			const res = await this.$axios.get('http://localhost:4000/auth/token')

			dispatch('saveUserData', {
				userData: res.data.userData,
				accessToken: res.data.accessToken
			})
		} catch (error) { return }
	},

	saveUserData ({ commit }, { userData, accessToken }) {
		commit('setUser', userData)
		commit('setAccessToken', accessToken)
		commit('setUserStatus')
	},

	removeUserData ({ commit }) {
		commit('unsetUser')
		commit('unsetAccessToken')
		commit('unsetUserStatus')
	},

	showNotification ({ commit, state }, config) {
		// each notification should be displayed for exactly 4s
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
		return state.auth.loggedIn
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
