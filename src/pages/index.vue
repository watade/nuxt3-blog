<script setup lang="ts">
import { type TypeMarkdownBlogPostSkeleton } from '@/types/contentful'

const { $createCtfClient, $formatDate } = useNuxtApp()

const { data: posts } = await useAsyncData(
  'posts',
  async () => {
    const client = $createCtfClient()
    const entries = await client.getEntries<TypeMarkdownBlogPostSkeleton>({
      content_type: 'markdownBlogPost',
      order: ["-fields.publishDate"],
    })
    return entries.items
  }
)
</script>

<template>
  <div>
    <article v-for="(post, index) in posts"
      :class="index == 0 ? 'py-3 sm:py-5 font-mono' : 'py-3 sm:py-5 font-mono border-t  border-black'">
      <NuxtLink :to="`/posts/${post.fields.slug}`">
        <div class="text-xl sm:text-2xl hover:underline">{{ post.fields.title }}</div>
      </NuxtLink>
      <time class="text-sm sm:text-base">{{ $formatDate(post.fields.publishDate) }}</time>
    </article>
  </div>
</template>