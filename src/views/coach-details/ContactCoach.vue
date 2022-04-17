<template>
  <base-container>
    <el-form ref="requestForm" label-width="70px" :model="form" :rules="rules">
      <ElFormItem label="Title" prop="title">
        <ElInput v-model="form.title" type="text" />
      </ElFormItem>
      <ElFormItem label="Message" prop="message">
        <ElInput v-model="form.message" type="textarea" :rows="5" />
      </ElFormItem>
      <div class="flex justify-end">
        <ElButton type="primary" plain @click="sendMessage">Send</ElButton>
      </div>
    </el-form>
  </base-container>
</template>

<script lang="ts">
import { IMessage } from '@/types'
import { IUser } from '@/types/user'
import { ElMessage } from 'element-plus'
import { computed, defineComponent, reactive, toRefs } from 'vue'
import { authStore } from '@/views/auth/auth.store'
import { userStore } from '@/store'
import { dialogService } from '@/services'

const showError = (msg: string): void => {
  ElMessage({
    type: 'error',
    message: msg,
    showClose: true
  })
}

const showSuccess = (msg: string): void => {
  ElMessage({
    type: 'success',
    message: msg,
    showClose: true
  })
}

export default defineComponent({
  props: {
    id: {
      required: true,
      type: String
    }
  },
  setup (props: any) {
    const { id: receiverUID } = toRefs(props)
    const form = reactive({
      title: '',
      message: ''
    })
    const rules = {
      title: [
        {
          required: true,
          trigger: 'blur',
          message: 'This field is required'
        }
      ],
      message: [
        {
          required: true,
          trigger: 'blur',
          message: 'This field is required'
        }
      ]
    }
    const receiver = computed<IUser>(() => {
      return userStore.coaches.find(u => u.UID === receiverUID.value) as IUser
    })
    async function sendMessage (): Promise<void> {
      const user: IUser = authStore.activeUser as IUser
      const newMessage: IMessage = {
        senderUID: user.UID,
        receiverUID: receiverUID.value,
        title: form.title,
        message: form.message,
        timestamp: Date.now().toString()
      }
      try {
        await dialogService.sendMessage({
          message: newMessage,
          from: user,
          to: receiver.value,
          token: authStore.token as string
        })
        await authStore.setActiveUser(user.UID)
        await userStore.setUsers()
        showSuccess('Sent!')
      } catch (err: unknown) {
        showError((err as Error).message)
      }
    }
    return {
      form,
      rules,
      sendMessage
    }
  }
})
</script>
