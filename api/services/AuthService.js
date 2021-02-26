import axios from 'axios'

class AuthService {
	static registerUser ({ username, email, password }) {
		return axios.post('http://localhost:4000/auth/register', {
			username, email, password
		})
	}

	static loginUser ({ username, password }) {
		return axios.post('http://localhost:4000/auth/login', {
			username, password
		})
	}

	static logoutUser () {
		return axios.delete('http://localhost:4000/auth/logout',
			{ withCredentials: true }
		)
	}
}

export default AuthService
