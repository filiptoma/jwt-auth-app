import axios from 'axios'

// `withCredentials: true` allows axios to send httpOnly cookie headers to api endpoint
class AuthService {
	static registerUser ({ username, email, password }) {
		return axios.post(
			'http://localhost:4000/auth/register',
			{ username, email, password }
		)
	}

	static loginUser ({ username, password }) {
		return axios.post(
			'http://localhost:4000/auth/login',
			{ username, password },
			{ withCredentials: true }
		)
	}

	static logoutUser () {
		return axios.delete(
			'http://localhost:4000/auth/logout',
			{ withCredentials: true }
		)
	}
}

export default AuthService
