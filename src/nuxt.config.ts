// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  runtimeConfig: {
    // ctfBlogPostTypeID: "",
    // ctfMarkdownBlogPostTypeID: "",
    ctfSpaceID: "",
    ctfCdaAccessToken: "",
    ctfCpaAccessToken: "",
  },
  typescript: {
    typeCheck: true,
  },
  modules: ["@nuxtjs/tailwindcss"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: ["~/assets/css/main.css"],
});
