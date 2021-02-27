import axios from 'axios'

// headers are later accessible by `request.headers['nameOfHeader']`
class PostsService {
	static newPost ({ post, accessToken }) {
		return axios.post(
			'http://localhost:3000/api/posts/new',
			{ post },
			{ headers: { 'Authorization': `Bearer ${accessToken}` } }
		)
	}

	static myPosts (accessToken) {
		return axios.get(
			'http://localhost:3000/api/posts/me',
			{ headers: { 'Authorization': `Bearer ${accessToken}` } }
		)
	}

	static allPosts () {
		return axios.get('http://localhost:3000/api/posts/all')
	}
}

export default PostsService
