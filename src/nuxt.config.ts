// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  runtimeConfig: {
    ctfSpaceID: "",
    ctfCdaAccessToken: "",
    ctfCpaAccessToken: "",
  },
  typescript: {
    typeCheck: true,
  },
  modules: ["@nuxt/image", "@nuxtjs/tailwindcss"],
  image: {
    contentful: {},
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: ["~/assets/css/main.css"],
});
