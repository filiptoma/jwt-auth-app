import axios from 'axios'

class UserService {
	static myProfileInfo (accessToken) {
		return axios.get('/api/user/me', {
			headers: {
				'Authorization': `Bearer ${accessToken}`
			}
		})
	}
}

export default UserService
