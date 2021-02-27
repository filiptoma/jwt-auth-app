export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s | JWT Auth App by filiptoma.com',
		title: 'JWT Auth App by filiptoma.com',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
				hid: 'description',
				name: 'description',
				content: `
					Auth App is a free-time project made by filiptoma.com. It uses JWT technology to authenticate and authorize user.
					To test it, some routes are available only to signed in users.`
			}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [ '~/assets/fonts/josefin-sans.css' ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
		{ src: '~/plugins/vue-unicons', mode: 'client' },
		{ src: '~/plugins/common-methods' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [ '@nuxtjs/tailwindcss' ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [ '@nuxtjs/axios' ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: { withCredentials: true },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

	serverMiddleware: [ '~/api/index.js' ]
}
