<script setup lang="ts">
import { useControlValueAccessor } from '@piying/view-vue';
import { vModelText } from 'vue';
import { vModelDynamic } from 'vue';

const { cva, value, disabled, valueChange, touchedChange } = useControlValueAccessor();
defineExpose({ cva });
</script>
<template>
    <input type="number" class="input" v-model-dynamic="value" :onUpdate:modelValue="valueChange"
        v-bind:disabled="disabled" @blur="touchedChange">
</template>

<style></style>
