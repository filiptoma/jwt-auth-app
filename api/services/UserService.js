import axios from 'axios'

class UserService {
	static myProfileInfo (accessToken) {
		return axios.get('http://localhost:3000/api/user/me', {
			headers: {
				'Authorization': `Bearer ${accessToken}`
			}
		})
	}
}

export default UserService
