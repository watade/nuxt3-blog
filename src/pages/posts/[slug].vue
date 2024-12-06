<script setup lang="ts">
import type { TypeMarkdownBlogPostSkeleton } from '@/types/contentful'
import 'highlight.js/styles/github.min.css'

const route = useRoute()
const { $createCtfClient } = useNuxtApp()

const { data: post } = await useAsyncData(
  route.params.slug as string,
  async () => {
    const client = $createCtfClient()
    const entries = await client.getEntries<TypeMarkdownBlogPostSkeleton>({
      content_type: 'markdownBlogPost',
      'fields.slug': route.params.slug as string,
    })
    return entries.items[0]
  }
)
</script>

<template>
  <div v-if="post">
    <div class="border-black text-3xl sm:text-4xl font-mono font-semibold pt-5">
      {{ post.fields.title }}
    </div>
    <div class="text-sm sm:text-base font-mono pb-8">
      {{ $formatDate(post.fields.publishDate) }}
    </div>
    <div class="markdown">
      <article v-html="$markdownToHtml(post.fields.body)"/>
    </div>
  </div>
</template>