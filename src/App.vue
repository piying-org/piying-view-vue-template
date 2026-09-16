<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

import '@valibot/i18n/zh-CN'
import { setGlobalConfig } from 'valibot'
const browserLanguage = navigator.language
if (browserLanguage.startsWith('zh')) {
  setGlobalConfig({ lang: 'zh-CN' })
}
</script>

<template>
  <nav class="flex gap-4 border-b p-3">
    <RouterLink class="link" to="/">auto</RouterLink>
    <RouterLink class="link" to="/manual">manual</RouterLink>
  </nav>
  <RouterView />
</template>

<style scoped></style>
