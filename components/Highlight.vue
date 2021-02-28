<template>
	<span class="font-semibold text-blue-900">

		<a v-if="link" :href="link" target="_blank">
			<span class="text-sm">🔗</span><span class="underline hover:no-underline hover:text-blue-700">
				<slot></slot>
			</span>
		</a>

		<span v-else>
			<slot></slot>
		</span>

	</span>
</template>

<script>
export default {
	name: 'Highlight',
	props: [ 'link' ]
}
</script>
