import axios from 'axios'

class TokenService {
	static getToken () {
		return axios.get(
			'http://localhost:4000/auth/token',
			{ withCredentials: true }
		)
	}
}

export default TokenService
