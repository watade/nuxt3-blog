<script setup lang="ts">
import { type TypeMarkdownBlogPostSkeleton } from '@/types/contentful'
import BlogPost from '@/components/BlogPost.vue'

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
    <BlogPost v-for="(post, index) in posts" :key="post.sys.id" :to="`/posts/${post.fields.slug}`"
      :title="post.fields.title" :publishDate="post.fields.publishDate" :index="index" />
  </div>
</template>