<template>
	<div class="bg-red-500">
		<p class="text-center text-white font-semibold py-2">
			{{ message }}
		</p>
	</div>
</template>

<script>
export default {
	name: 'AuthError',
	props: [ 'message' ]
}
</script>
