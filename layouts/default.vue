<template>
  <div class="text-gray-600 overflow-x-hidden">
		<AppHeader />
    <Nuxt />
  </div>
</template>

<script>
import AppHeader from '/components/AppHeader'

export default {
	components: {
		AppHeader
	}
}
</script>

<style>
html {
  font-family: 'Josefin Sans', sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

.slide-bottom-enter-active,
.slide-bottom-leave-active {
	transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
}

.slide-bottom-enter,
.slide-bottom-leave-to {
	opacity: 0;
	transform: translate3d(15px, 0, 0);
}
</style>
