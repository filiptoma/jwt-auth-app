import TokenService from '/api/services/TokenService'

// export default ({ store }, inject) => {
// 	const setIntervalAsync = async (renewAccess, ms) => {
// 		console.log('---STARTING SILENT REFRESH---')
// 		try {
// 			console.log('Starting to execute silent refresh...')
// 			const res = await renewAccess()
// 			console.log('Data obtained, starting to save them...')
// 			store.dispatch('saveUserData', {
// 				userData: res.data.userData,
// 				accessToken: res.data.accessToken
// 			})
// 			console.log('Data saved successfully, setting new expiry...')
// 			ms = res.data.expiry
// 			console.log('---SILENT REFRESH FINISHED---')
// 			setTimeout(() => setIntervalAsync(renewAccess, ms), ms)
// 		} catch (error) {
// 			console.error(`Error ${error.response.status}`)
// 		}
// 	}

// 	const silentRefresh = setIntervalAsync(() => TokenService.getToken(), null)

// 	inject('silentRefresh', silentRefresh)
// }

// export default ({ store }, inject) => {
// 	const silentRefresh = async () => {
// 		console.log('---STARTING SILENT REFRESH---')
// 		try {
// 			const res = await TokenService.getToken()
// 			store.dispatch('saveUserData', {
// 				userData: res.data.userData,
// 				accessToken: res.data.accessToken
// 			})
// 			setTimeout(() => silentRefresh(), res.data.expiry)
// 		} catch (error) {
// 			console.error(`Error ${error.response.status}`)
// 		}
// 	}

// 	inject('silentRefresh', () => silentRefresh())
// }

export default (context, inject) => {
	// const test = setTimeout(() => console.log('hello'), 2000)
	inject('hello', () => setTimeout(() => console.log('hello'), 2000)) // HERE <-----------------
}

// export default ({ store }, inject) => {
// 	inject('silentRefresh', async () => {
// 		console.log('---STARTING SILENT REFRESH---')
// 		try {
// 			const res = await TokenService.getToken()
// 			store.dispatch('saveUserData', {
// 				userData: res.data.userData,
// 				accessToken: res.data.accessToken
// 			})
// 			setTimeout(() => )
// 		}
// 	})
// }
