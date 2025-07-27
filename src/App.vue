<script setup lang="ts">
import { RouterView } from 'vue-router'

import '@valibot/i18n/zh-CN'
import { setGlobalConfig } from 'valibot'
const browserLanguage = navigator.language
if (browserLanguage.startsWith('zh')) {
  setGlobalConfig({ lang: 'zh-CN' })
}
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
