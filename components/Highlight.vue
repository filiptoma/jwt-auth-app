<template>
	<span class="font-semibold text-blue-900">

		<a v-if="link" :href="link" target="_blank" class="underline">
			<span class="text-sm">🔗</span><slot></slot>
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
