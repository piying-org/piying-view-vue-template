<script setup lang="ts">
import * as v from 'valibot'
import { setComponent, typedFieldPipe } from '@piying/view-core'
import {
  Field,
  InjectorToken,
  PiyingFieldTemplate,
  convertToField,
  typedFieldComponentPipe,
} from '@piying/view-vue'
import { computed, provide, unref } from 'vue'
import { fieldConfig } from '@/components/define'
import { CustomNgBuilder } from '@/components/piying/custom.builder'
import { root } from '@/injector'

const Schema = v.object({
  text1: v.pipe(v.optional(v.string()), v.title('text1-label')),
  number1: v.pipe(v.number(), v.title('number1')),
  radio1: v.pipe(
    v.optional(v.picklist(['v1', 'v2'])),
    setComponent('radio'),
    v.title('radio1-title'),
  ),
  checkbox1: v.optional(v.boolean()),
})

const TypedSchema = typedFieldComponentPipe(Schema, fieldConfig, (d) => [
  d(['radio1'], 'radio', [
    d.inputs.patch({
      options: [
        { label: 'label-v1', value: 'v1' },
        { label: 'label-v2', value: 'v2' },
      ],
    }),
  ]),
])

// 监听 radio1 的 indexChange, 把 text1 改成 "set <选中索引>"
const TypedSchema2 = typedFieldPipe(TypedSchema, (d) => [
  d(
    ['text1'],
    [
      d.outputChange((fn) => {
        fn([{ list: ['..', 'radio1'], output: 'indexChange' }]).subscribe((change) => {
          change.field.form.control?.updateValue(`set ${change.list[0]![0]}`)
        })
      }),
    ],
  ),
])
const field = convertToField(
  () => TypedSchema2,
  undefined,
  () => ({
    fieldGlobalConfig: fieldConfig,
    builder: CustomNgBuilder,
  }),
)

provide(
  InjectorToken,
  computed(() => root),
)
</script>

<template>
  <div class="grid gap-2 p-4">
    <!-- 原生 input 直接绑到 text1 -->
    <Field :field="field" :path="['text1']" v-slot="{ cvaa }">
      <input
        type="text"
        class="input"
        placeholder="text1"
        :value="unref(cvaa.value) ?? ''"
        :disabled="unref(cvaa.disabled)"
        @input="cvaa.valueChange($event.target.value)"
        @blur="cvaa.touchedChange"
      />
    </Field>

    <!-- 原生 number input 绑到 number1 -->
    <Field :field="field" :path="['number1']" v-slot="{ cvaa }">
      <input
        type="number"
        class="input"
        placeholder="number1"
        :value="unref(cvaa.value) ?? ''"
        :disabled="unref(cvaa.disabled)"
        @input="
          cvaa.valueChange($event.target.value === '' ? undefined : Number($event.target.value))
        "
        @blur="cvaa.touchedChange"
      />
    </Field>

    <!-- 组件型字段走 field-template -->
    <PiyingFieldTemplate :field="field" :path="['radio1']" />

    <!-- 原生 checkbox 绑到 checkbox1 -->
    <Field :field="field" :path="['checkbox1']" v-slot="{ cvaa }">
      <label class="label cursor-pointer justify-start gap-2">
        <input
          type="checkbox"
          class="checkbox"
          :checked="unref(cvaa.value) ?? false"
          :disabled="unref(cvaa.disabled)"
          @change="cvaa.valueChange($event.target.checked)"
          @blur="cvaa.touchedChange"
        />
        <span class="label-text">checkbox1</span>
      </label>
    </Field>
  </div>
</template>
