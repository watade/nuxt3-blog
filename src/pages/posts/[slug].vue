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
  'post',
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
  <!-- <div v-if="post" class="relative"> -->
    <!-- <div v-if="post.fields.topImage">
      <img v-if="post.fields.topImage.fields.file"
      :src="post.fields.topImage.fields.file.url" class="object-cover"/>
    </div> -->
    <div class="border-black text-4xl font-mono font-semibold pt-5 pb-8">{{ post.fields.title }}</div>
    <div class="markdown">
      <article v-if="post.fields.body" v-html="marked.parse(post.fields.body)"></article>
    </div>
  </div>
</template>