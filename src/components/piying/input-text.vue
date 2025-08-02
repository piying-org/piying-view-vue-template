<script setup lang="ts">
import { useControlValueAccessor } from '@piying/view-vue'
import { vModelDynamic } from 'vue'

const {
  cva,
  cvaa: { value, disabled, valueChange, touchedChange },
} = useControlValueAccessor()
defineExpose({ cva })
</script>
<template>
  <input
    type="text"
    class="input"
    v-model-dynamic="value"
    :onUpdate:modelValue="valueChange"
    v-bind:disabled="disabled"
    @blur="touchedChange"
  />
</template>

<style></style>
