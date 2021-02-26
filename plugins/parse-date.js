export default (context, inject) => {
	inject('parseDate', rawDate => {
		const dateAndTime = rawDate.split('T')
		const date = dateAndTime[0].split('-')
		const time = dateAndTime[1].slice(0, -1).split(':')

		return `${date[2]}/${date[1]}/${date[0]}, ${time[0]}:${time[1]} UTC`
	})
}
