<script setup lang="ts">
import { PI_VIEW_FIELD_TOKEN, signalToRef } from '@piying/view-vue'
import { inject } from 'vue'

const field = inject(PI_VIEW_FIELD_TOKEN)
const props = signalToRef(() => field?.value.props())
</script>
<template>
    <div class="flex gap-2 items-center">
        <span class="label" v-if="props['title']">{{ props['title'] }}</span>
        <slot></slot>
    </div>
</template>

<style></style>
