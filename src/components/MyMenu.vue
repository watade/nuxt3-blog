<script setup lang="ts">
const emit = defineEmits<{
  close: []
}>()

const goHome = function() {
  emit('close')
  return navigateTo('/')
}
</script>

<template>
  <Teleport to="body">
    <div class="backdrop-blur-sm modal">
      <div class="flex justify-end pr-9 sm:pr-20 lg:pr-30 xl:pr-40 pt-9 sm:pt-12 text-neutral-200">
        <button @click="emit('close')">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-9 h-9">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>    
        </button>
      </div>
      <div class="flex flex-col items-center text-2xl sm:text-3xl">
        <p class="text-neutral-500 hover:text-neutral-200 cursor-pointer my-6" @click="goHome()">HOME</p>
        <p class="text-neutral-500 hover:text-neutral-200 cursor-pointer my-6">ABOUT</p>
        <div class="relative mt-10 text-base w-1/2 max-w-xl">
          <span class="absolute inset-y-0 left-0 flex items-center pl-2">
            <button type="submit" class="p-1 outline-none shadow-outline">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </span>
          <input type="search" name="q" class="py-2 w-full rounded-md pl-10 outline-none bg-neutral-200 text-neutral-900" autocomplete="off">
        </div>
      </div>
    </div>
  </Teleport>
</template>