<script setup>
const showMenu = ref(false)

const switchMenu = function() {
  showMenu.value=!showMenu.value
}
</script>

<template>
  <header class="flex items-center justify-between sticky top-0 pt-4 sm:pt-7">
    <div class="font-mono font-extralight text-2xl sm:text-3xl pt-7 pb-7">
      <NuxtLink to="/">kankikeninshi</NuxtLink>
    </div>
    <div class="relative bottom-0.5">
      <button @click="switchMenu()">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-9 h-9">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>
    </div>
  </header>
  <MyMenu v-if="showMenu" @close="switchMenu()"></MyMenu>
</template>
