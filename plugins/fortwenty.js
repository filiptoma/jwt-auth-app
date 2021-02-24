import TokenService from "~/api/services/TokenService"

// Called immediately
export default (context, inject) => {
	const myFunc = async (givenFunc) => {
		console.log('420 blazinnn')
		const res = await givenFunc()
		console.log(res.data)
	}
	inject('fortwenty', myFunc(() => TokenService.getTestToken()))
}

// Called after calling this.$fortwenty()
// export default (context, inject) => {
// 	const myFunc = async (givenFunc) => {
// 		console.log('420 blazinnn')
// 		const res = await givenFunc()
// 		console.log(res.data)
// 	}
// 	inject('fortwenty', () => myFunc(() => TokenService.getTestToken()))
// }
