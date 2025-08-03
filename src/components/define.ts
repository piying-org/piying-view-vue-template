import InputText from './piying/input-text.vue'
import InputNumber from './piying/input-number.vue'
import InputRadio from './piying/input-radio.vue'
import InputCheckbox from './piying/input-checkbox.vue'
import FieldsetGroup from './piying/group/fieldset.vue'
import LabelWrapper from './piying/wrapper/label-wrapper.vue'
import ValidatorWrapper from './piying/wrapper/validator-wrapper.vue'
import type { PiViewConfig } from '@piying/view-vue'
export const fieldConfig = {
  types: {
    string: { type: InputText, wrappers: ['label'] },
    number: { type: InputNumber, wrappers: ['label'] },
    radio: { type: InputRadio },
    boolean: { type: InputCheckbox, wrappers: ['label'] },
    fieldset: { type: FieldsetGroup },
    formHelper: { type: () => import('./piying/form-helper.vue') },
  },
  wrappers: {
    label: {
      type: LabelWrapper,
    },
    validator: {
      type: ValidatorWrapper,
    },
  },
} as PiViewConfig
