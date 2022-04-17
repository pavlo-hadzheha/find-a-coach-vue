<template>
  <ElCheckboxGroup v-model="chosen" @change="activate">
    <ElCheckboxButton
      v-for="skill of skillOptions"
      :key="skill.skill"
      :label="skill.skill"
    >
      {{ skill.skill }}
    </ElCheckboxButton>
  </ElCheckboxGroup>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, SetupContext } from 'vue'
import { skillOptions, ICoachSkills } from '@/types/user'
import { ElCheckboxButton, ElCheckboxGroup } from 'element-plus'

export default defineComponent({
  components: {
    ElCheckboxButton,
    ElCheckboxGroup
  },
  props: {
    modelValue: {
      type: Object as PropType<Array<keyof ICoachSkills>>
    }
  },
  emits: ['update:modelValue'],
  setup (_: any, context: SetupContext) {
    const chosen = ref([])
    const activate = () => {
      console.log(chosen.value)
      context.emit('update:modelValue', chosen.value)
    }
    return {
      skillOptions: ref(skillOptions),
      chosen,
      activate
    }
  }
})
</script>
