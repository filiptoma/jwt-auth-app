export const state = () => ({
	auth: {
		isLoggedIn: false,
		user: null,
		accessToken: null
	}
})

export const mutations = {
	setUser (state, userData) {
		state.auth.user = userData
	},

	setAccessToken (state, newAccessToken) {
		state.auth.accessToken = newAccessToken
	},

	hasLoggedIn (state) {
		state.auth.isLoggedIn = true
	}
}

export const actions = {
	saveUserData ({ commit }, { userData, accessToken }) {
		commit('setUser', userData)
		commit('setAccessToken', accessToken)
		commit('hasLoggedIn')
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
	}
}
