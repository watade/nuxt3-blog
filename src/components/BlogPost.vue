<script setup lang="ts">

const { $formatDate } = useNuxtApp()

const props = defineProps<{
    to: string
    title: string
    publishDate: string
    index: number
}>()
</script>

<template>
    <article :class="index == 0 ? 'py-3 sm:py-5 font-mono' : 'py-3 sm:py-5 font-mono border-t  border-slate-900'">
        <NuxtLink :to="to">
            <div class="text-xl sm:text-2xl hover:underline">{{ title }}</div>
        </NuxtLink>
        <time class="text-sm sm:text-base">{{ $formatDate(publishDate) }}</time>
    </article>
</template>