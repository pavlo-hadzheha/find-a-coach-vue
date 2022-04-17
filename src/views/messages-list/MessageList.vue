<template>
  <base-container plain="false" class="mb-4">
    <h1 class="text-2xl font-bold text-blue-400 flex justify-between">
      <span>Conversation with {{ notMyName }} </span>
      <ElButton type="success" circle @click="getDialog">
        <ElIcon>
          <refresh-icon />
        </ElIcon>
      </ElButton>
    </h1>
  </base-container>
  <base-container id="reply" class="mb-4">
    <ElForm ref="requestForm" label-width="70px" :model="form" :rules="rules">
      <ElFormItem label="Title" prop="title">
        <ElInput
          v-model="form.title"
          type="text"
        />
      </ElFormItem>
      <ElFormItem label="Message" prop="message">
        <ElInput
          v-model="form.message"
          type="textarea"
          :rows="1"
        />
      </ElFormItem>
      <div class="flex justify-end">
        <ElButton type="primary" plain @click="sendMessage">Send</ElButton>
      </div>
    </ElForm>
  </base-container>
  <div v-if="dialog" id="messageList">
    <MessageItem
      v-for="message of dialog.messages"
      :key="message.recordID"
      :message="message"
      :me="activeUser"
      :otherGuy="notMe"
    />
  </div>
</template>

<script lang="ts">
import { IDialog, IMessage, TNullableField } from '@/types'
import { IUser } from '@/types/user'
import { computed, defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
import { authStore, userStore } from '@/store'
import { dialogService } from '@/services'

import MessageItem from './MessageItem.vue'
import { ElLoading, ElMessage } from 'element-plus'

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
  components: {
    MessageItem
  },
  props: {
    dialogUID: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const { dialogUID } = toRefs(props)
    const dialog = ref<IDialog | null>(null)
    const activeUser = computed<TNullableField<IUser>>(() => authStore.activeUser)

    const form = reactive({
      title: '',
      message: ''
    })
    const notMe = computed(() => {
      return (dialog.value?.user1.UID === activeUser.value?.UID
        ? dialog.value?.user2
        : dialog.value?.user1) as IUser
    })
    const notMyName = computed<string>(() => {
      if (notMe.value) {
        return notMe.value?.firstName + ' ' + notMe.value?.lastName
      } else {
        return ''
      }
    })
    async function getDialog (): Promise<void> {
      dialog.value = await dialogService.getOne(dialogUID.value, authStore.token as string)
    }
    async function sendMessage (): Promise<void> {
      const me = activeUser.value as IUser
      const nMe = notMe.value as IUser
      const newMessage: IMessage = {
        senderUID: me?.UID,
        receiverUID: nMe?.UID,
        title: form.title,
        message: form.message,
        timestamp: Date.now().toString()
      }
      try {
        dialog.value = await dialogService.sendMessage({
          message: newMessage,
          from: me,
          to: nMe,
          token: authStore.token as string
        })
        await authStore.setActiveUser(me.UID)
        await userStore.setUsers()
        showSuccess('Sent!')
      } catch (err: unknown) {
        showError((err as Error).message)
      }
    }
    onMounted(async () => {
      const loadingInstance = ElLoading.service({ target: '#messageList' })
      await authStore.autoSignIn()
      await getDialog()
      loadingInstance.close()
    })
    return {
      dialog,
      activeUser,
      notMe,
      notMyName,
      form,
      getDialog,
      sendMessage,
      rules: {
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
    }
  }
})
</script>
