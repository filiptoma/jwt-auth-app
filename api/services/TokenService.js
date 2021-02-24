import axios from 'axios'

class TokenService {
	static getToken () {
		return axios.post('/auth/token')
	}

	static getTestToken () {
		return axios.get('/auth/token/test')
	}
}

export default TokenService
