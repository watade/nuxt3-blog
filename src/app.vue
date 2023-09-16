<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: 'background'
  }
})
</script>

<template>
  <div class="px-8 sm:px-20 lg:px-30 xl:px-40">
    <MyHeader />
    <div class="max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto px-3 pb-8">
      <NuxtPage />
    </div>
  </div>
</template>
