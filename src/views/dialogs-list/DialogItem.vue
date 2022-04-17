<template>
  <base-container :id="'ID' + notMe.UID">
    <div class="flex items-center justify-between">
      <div class="dialogData">
        <h4 class="font-bold text-blue-500 text-md">
          Conversation with {{ notMyName }}
          <span class="text-sm text-blue-300">[last {{ lastMessageDate }}]</span>
        </h4>
        <div v-if="dialog">
          <h5>
            <span class="font-bold">{{
              lastMessageFromMe ? "Me" : notMyName
            }}</span>: {{ lastMessage.title }}
          </h5>
          <p>
            <span class="font-bold">Message</span>:
            {{
              lastMessage.length > 20
                ? lastMessage.message.slice(0, 20)
                : lastMessage.message
            }}...
          </p>
        </div>
      </div>
      <div class="actions">
        <!--        <router-link :to="'/dialogs/' + dialog.recordID">-->
        <router-link
          :to="{
            name: $routeNames.messagesList,
            params: {
              dialogUID: dialog.recordID || 124,
            },
          }"
        >
          <ElButton type="primary" plain>View history</ElButton>
        </router-link>
      </div>
    </div>
  </base-container>
</template>

<script lang="ts">
import { IDialog, IMessage } from '@/types'
import { IUser } from '@/types/user'
import { computed, defineComponent, PropType, toRefs } from 'vue'
import { authStore } from '@/views/auth/auth.store'
import { formattedDate } from '@/core/utils/date.utils'
import { routeNames } from '@/router'

export default defineComponent({
  props: {
    dialog: {
      required: true,
      type: Object as PropType<IDialog>
    }
  },
  setup (props: { dialog: IDialog }) {
    const { dialog } = toRefs(props)
    const activeUser = computed<IUser>(() => authStore.activeUser as IUser)
    const lastMessage = computed<IMessage>(() => dialog.value.messages[0])
    const lastMessageFromMe = computed<boolean>(
      () => lastMessage.value.senderUID === activeUser.value.UID
    )
    const lastMessageDate = computed<string>((): string => {
      return formattedDate(lastMessage.value.timestamp)
    })
    const messagesLink = computed(() => ({
      name: routeNames.messagesList,
      params: {
        dialogUID: dialog.value.recordID
      }
    }))
    const notMe = computed<IUser>(() => {
      return dialog.value.user1.UID === activeUser.value.UID
        ? dialog.value.user2
        : dialog.value.user1
    })
    const notMyName = computed(
      () => notMe.value.firstName + ' ' + notMe.value.lastName
    )
    return {
      lastMessage,
      lastMessageFromMe,
      lastMessageDate,
      notMe,
      notMyName,
      messagesLink
    }
  }
})
</script>
