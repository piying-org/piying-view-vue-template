<script setup lang="ts">
import { PI_VIEW_FIELD_TOKEN, signalToRef } from '@piying/view-vue'
import JSONFormatter from 'json-formatter-js'
import { summarize } from 'valibot'
import { computed, inject, ref } from 'vue'
const field = inject(PI_VIEW_FIELD_TOKEN)!
const control = signalToRef(() => field.value.form.root)
const value = signalToRef(() => control.value.value$$())
const formatedHtml = computed(() => new JSONFormatter(value.value).render().outerHTML)
const errors$$ = signalToRef(() => control.value.errors)
const errorStr$$ = computed(() => {
  if (!errors$$.value) {
    return ''
  }
  const errors = errors$$.value

  if (errors['valibot']) {
    return summarize(errors['valibot'])
  } else {
    return Object.values(errors)
      .map((item) => (typeof item === 'string' ? item : JSON.stringify(item)))
      .join('\n')
  }
})
const hasError = signalToRef(() => !!control.value.errors)
const isChangedStatus = signalToRef(() => control.value?.dirty$$() || control.value?.touched$$())
function submit() {
  field.value.form.root.emitSubmit()
  if (field.value.form.root.valid) {
    alert(JSON.stringify(value.value, undefined, 4))
  }
}
const initData = ref(undefined)
function resetForm() {
  control.value.reset(initData.value)
}
function saveInit() {
  initData.value = value.value
}
const forceShowError = signalToRef(() => field.value.props()['forceShowError'])
</script>
<template>
  <div>
    <div v-html="formatedHtml"></div>

    <template class="text-error" v-if="forceShowError || (hasError && isChangedStatus)">
      <div>
        <label class="label">Form Error</label>
        <pre class="mt-2 text-error">{{ errorStr$$ }}</pre>
      </div>
    </template>

    <div class="flex gap-2 items-center">
      <button :disabled="control.invalid" class="btn btn-primary" @click="submit()">Submit</button>
      <button class="btn btn-outline btn-secondary" @click="resetForm()">Reset</button>
      <button class="btn btn-outline btn-accent" @click="saveInit()">Update Intial Values</button>
    </div>
  </div>
</template>

<style></style>
