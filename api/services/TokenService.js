import axios from 'axios'

class TokenService {
	static getToken () {
		return axios.get('http://localhost:4000/token/test')
	}
}

export default TokenService
