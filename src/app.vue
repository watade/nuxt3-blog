<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: 'background overscroll-none'
  },
  htmlAttrs: {
    class: 'overscroll-none',
    style: "scrollbar-gutter: stable"
  }
})
</script>

<template>
  <div class="px-2 sm:px-8 lg:px-20 xl:px-28">
    <MyHeader />
    <div class="max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto px-3 pb-8">
      <NuxtPage />
    </div>
  </div>
</template>
