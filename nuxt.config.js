export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'jwt-auth-app',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
			{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;500;600;700&display=swap' },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
		{ src: '~/plugins/vue-unicons', mode: 'client' },
		{ src: '~/plugins/define-user', mode: 'client' },
		{ src: '~/plugins/silent-refresh', mode: 'client' },
		{ src: '~/plugins/parse-date', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

	proxy: {},
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

	serverMiddleware: [
		'~/api/index.js'
	]
}
