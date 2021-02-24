import axios from 'axios'

class AuthService {
	static registerUser ({ username, email, password }) {
		return axios.post('/auth/register', {
			username, email, password
		})
	}

	static loginUser ({ username, password }) {
		return axios.post('/auth/login', {
			username, password
		})
	}

	static logoutUser () {
		return axios.delete('/auth/logout',
			{ withCredentials: true }
		)
	}
}

export default AuthService
