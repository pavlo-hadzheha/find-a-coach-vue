<template>
  <base-container>
    <ElForm
      :model="form"
      :rules="{
        email: {
          required: true,
          type: 'email',
          trigger: 'blur'
        }
      }"
    >
      <ElFormItem label="Email" prop="email">
        <ElInput v-model="email" />
      </ElFormItem>
    </ElForm>
    <h1 class="text-purple-700 text-2xl">{{ email }}</h1>
  </base-container>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { ElForm, ElFormItem, ElInput } from 'element-plus'
import './typescript'

export default defineComponent({
  name: 'TestView',
  components: { ElForm, ElFormItem, ElInput },
  setup () {
    const email = ref('')
    const form = reactive({
      email: ''
    })
    return {
      email,
      form
    }
  }
})
</script>
