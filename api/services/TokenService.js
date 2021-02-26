import axios from 'axios'

class TokenService {
	static getToken () {
		return axios.post('http://localhost:4000/auth/token')
	}
}

export default TokenService
