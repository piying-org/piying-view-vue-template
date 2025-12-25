import InputText from './piying/input-text.vue'
import InputNumber from './piying/input-number.vue'
import InputRadio from './piying/input-radio.vue'
import InputCheckbox from './piying/input-checkbox.vue'
import FieldsetGroup from './piying/group/fieldset.vue'
import LabelWrapper from './piying/wrapper/label-wrapper.vue'
import ValidatorWrapper from './piying/wrapper/validator-wrapper.vue'
import type { PiViewConfig } from '@piying/view-vue'
import { actions } from '@piying/view-core'
export const fieldConfig = {
  types: {
    string: { type: InputText, actions: [actions.wrappers.set(['label'])] },
    number: { type: InputNumber, actions: [actions.wrappers.set(['label'])] },
    radio: { type: InputRadio },
    boolean: { type: InputCheckbox, actions: [actions.wrappers.set(['label'])] },
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
