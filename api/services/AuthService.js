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
}

export default AuthService
