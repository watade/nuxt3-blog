<script setup lang="ts">
import type { TypeMarkdownBlogPostSkeleton, TypeTagSkeleton } from '@/types/contentful'
import BlogPost from '@/components/BlogPost.vue'

const route = useRoute()
const { $createCtfClient } = useNuxtApp()

const { data: tag, error: err } = await useAsyncData(
  'tags/' + route.params.slug as string,
  async () => {
    const client = $createCtfClient()
    const entries = await client.getEntries<TypeTagSkeleton>({
      content_type: 'tag',
      'fields.slug': route.params.slug as string,
    })
    return entries.items[0]
  }
)

const { data: posts } = await useAsyncData(
  'tags/' + route.params.slug as string + '/posts',
  async () => {
    const client = $createCtfClient()
    const entries = await client.getEntries<TypeMarkdownBlogPostSkeleton>({
      content_type: 'markdownBlogPost',
      'fields.tags.sys.id': tag.value?.sys.id,
      order: ["-fields.publishDate"],
    })
    return entries.items
  }
)

if (err.value) {
  throw createError({
    statusCode: 404,
    message: "タグが見つかりませんでした",
    fatal: true,
  });
}
</script>

<template>
  <div>
    <div class="border-black text-xl sm:text-2xl font-mono font-semibold pt-5 pb-2">
        tag: {{ tag?.fields.name }}
    </div>
    <div>
      <BlogPost
v-for="(post, index) in posts" :key="post.sys.id" :to="`/posts/${post.fields.slug}`"
        :title="post.fields.title" :publish-date="post.fields.publishDate" :index="index" />
    </div>
  </div>
</template>