<script setup lang="ts">
import { marked } from 'marked'
import { TypeMarkdownBlogPostSkeleton } from '@/types/contentful'

marked.use({
  mangle: false,
  headerIds: false
});

const route = useRoute()
const { $createCtfClient } = useNuxtApp()

const { data: post } = await useAsyncData(
  route.params.slug as string,
  async () => {
    const client = $createCtfClient()
    return await client.withoutUnresolvableLinks.getEntries<TypeMarkdownBlogPostSkeleton>({
      content_type: 'markdownBlogPost',
      'fields.slug': route.params.slug as string,
    }).then(
      (entries) => {
        return entries.items[0]
      }
    )
  }
)
</script>

<template>
  <div v-if="post">
    <div class="border-black text-3xl sm:text-4xl font-mono font-semibold pt-5">
      {{ post.fields.title }}
    </div>
    <div v-if="post.fields.publishDate" class="text-sm sm:text-base font-mono pb-8">
      {{ $formatDate(post.fields.publishDate) }}
    </div>
    <div class="markdown">
      <article v-if="post.fields.body" v-html="marked.parse(post.fields.body)"></article>
    </div>
  </div>
</template>