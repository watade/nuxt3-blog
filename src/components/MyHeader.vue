<template>
  <header class="flex items-center justify-between sticky top-0 pt-2 sm:pt-4">
    <div class="font-mono font-extralight text-xl sm:text-3xl py-4 sm:py-7">
      <NuxtLink to="/">kankikeninshi</NuxtLink>
    </div>
    <div class="flex justify-between max-[440px]:w-32 w-36 sm:w-48 font-mono font-extralight text-sm sm:text-lg">
      <NuxtLink to="/about" class="underline hover:no-underline">about</NuxtLink>
      <NuxtLink to="/" class="underline hover:no-underline">blog</NuxtLink>
      <NuxtLink to="/tags" class="underline hover:no-underline">tags</NuxtLink>
    </div>
  </header>
</template>
