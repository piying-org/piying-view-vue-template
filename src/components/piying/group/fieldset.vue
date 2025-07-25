<script setup lang="ts">
import type { PiResolvedViewFieldConfig } from '@piying/view-vue'
import { PI_VIEW_FIELD_TOKEN, PiyingFieldTemplate, signalToRef } from '@piying/view-vue'
import { inject } from 'vue'

const dInputs = defineProps<{
  fields: PiResolvedViewFieldConfig[]
}>()
const field = inject(PI_VIEW_FIELD_TOKEN)
const props = signalToRef(() => field?.value.props())
</script>
<template>
  <fieldset class="fieldset bg-base-200 border-base-300 rounded-box border p-4 w-full">
    <legend class="fieldset-legend" v-if="props['title']">{{ props['title'] }}</legend>
    <template v-for="(field, index) in dInputs.fields" :key="index">
      <piying-field-template :field="field!"></piying-field-template>
    </template>
  </fieldset>
</template>

<style></style>
