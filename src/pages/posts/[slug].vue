<script setup lang="ts">
import type { TypeMarkdownBlogPostSkeleton } from '@/types/contentful'
import 'highlight.js/styles/github.min.css'

const route = useRoute()
const { $createCtfClient } = useNuxtApp()

const { data: post, error: err } = await useAsyncData(
  'posts/' + route.params.slug as string,
  async () => {
    const client = $createCtfClient()
    const entries = await client.withoutUnresolvableLinks.getEntries<TypeMarkdownBlogPostSkeleton>({
      content_type: 'markdownBlogPost',
      'fields.slug': route.params.slug as string,
    })
    return entries.items[0]
  }
)

if (err.value) {
  throw createError({
    statusCode: 404,
    message: "記事が見つかりませんでした",
    fatal: true,
  });
}

</script>

<template>
  <div v-if="post">
    <div class="border-black text-2xl sm:text-4xl font-mono font-semibold pt-5 pb-2">
      {{ post.fields.title }}
    </div>
    <div v-if="post.fields.tags" class="text-right text-sm sm:text-base font-mono py-2">
      <template v-for="(tag, index) in post.fields.tags" :key="index">
        <span v-if="index > 0" class="pl-2">|</span>
        <NuxtLink v-if="tag" :to="'/tags/'+tag.fields.slug" class="pl-2 underline">{{ tag.fields.name }}</NuxtLink>
      </template>
    </div>
    <div class="text-right text-sm sm:text-base font-mono py2">
      {{ $formatDate(post.fields.publishDate) }}
    </div>
    <div class="markdown">
      <article v-html="$markdownToHtml(post.fields.body)"/>
    </div>
  </div>
</template>