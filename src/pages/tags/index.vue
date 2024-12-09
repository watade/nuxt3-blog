<script setup lang="ts">
import type { TypeTagSkeleton } from '@/types/contentful'

const { $createCtfClient } = useNuxtApp()

const { data: tags } = await useAsyncData(
  'tags',
  async () => {
    const client = $createCtfClient()
    const entries = await client.getEntries<TypeTagSkeleton>({
      content_type: 'tag',
      order: ["fields.name"],
    })
    return entries.items
  }
)

</script>
<template>
  <div>
    <div class="border-black text-xl sm:text-2xl font-mono font-semibold py-5">
      tags
    </div>
    <div class="flex flex-wrap text-sm sm:text-base font-mono py-2">
      <template v-for="(tag, index) in tags" :key="index">
        <span v-if="index > 0" class="pl-2">|</span>
        <NuxtLink v-if="tag" :to="'/tags/'+tag.fields.slug" class="pl-2 underline">{{ tag.fields.name }}</NuxtLink>
      </template>
    </div>
  </div>
</template>