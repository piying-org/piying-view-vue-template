<script setup lang="ts">
import { useControlValueAccessor } from '@piying/view-vue'
import { computed } from 'vue'
import { vModelDynamic } from 'vue'
import {
  DefaultOptionConvert,
  getRadioIndex,
  transformOptions,
  type OptionConvert,
} from './util/options'
const { cva, value, disabled, valueChange, touchedChange } = useControlValueAccessor()
defineExpose({ cva })
const props = withDefaults(defineProps<{ options?: any[]; optionConvert?: OptionConvert }>(), {
  options: () => [],
  optionConvert: (props) => {
    return { ...DefaultOptionConvert, ...props.optionConvert }
  },
})
const resolvedOptions = computed(() => {
  return transformOptions(props.options, props.optionConvert)
})
const name = `radio-${getRadioIndex()}`
</script>
<template>
  <template v-for="(field, index) in resolvedOptions">
    <div>
      <input
        :name="name"
        type="radio"
        class="radio"
        v-model-dynamic="value"
        :onUpdate:modelValue="valueChange"
        v-bind:disabled="field.disabled || disabled"
        @blur="touchedChange"
        :value="field.value"
      />
      <div class="label">{{ field.label }}</div>
    </div>
  </template>
</template>

<style></style>
