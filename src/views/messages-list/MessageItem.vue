<template>
  <div class="container m-auto max-w-screen-md mb-2 flex flex-col">
    <div class="p-6 rounded-lg shadow-lg duration-200 w-5/6" :class="messageClasses">
      <div class="relative">
        <h1 class="font-bold">{{ senderName }}: {{ message.title }}</h1>
        <p>{{ message.message }}</p>
        <span class="absolute date font-thin">{{ date }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { IMessage } from '@/types'
import { IUser } from '@/types/user'
import { computed, defineComponent, PropType, toRefs } from 'vue'
import { formattedDate } from '@/core/utils/date.utils'

export default defineComponent({
  props: {
    message: {
      required: true,
      type: Object as PropType<IMessage>
    },
    me: {
      required: true,
      type: Object as PropType<IUser>
    },
    otherGuy: {
      required: true,
      type: Object as PropType<IUser>
    }
  },
  setup (props) {
    const { message, me, otherGuy } = toRefs(props)
    const myMessage = computed<boolean>(() => {
      return message.value.senderUID === me.value.UID
    })
    const myName = computed<string>(() => {
      return me.value.firstName + ' ' + me.value.lastName
    })
    const notMyName = computed<string>(() => {
      return otherGuy.value.firstName + ' ' + otherGuy.value.lastName
    })
    const senderName = computed<string>(() => {
      return myMessage.value ? 'Me' : notMyName.value
    })
    const messageClasses = computed<any>(() => {
      return {
        'bg-yellow-100': !myMessage.value,
        'bg-blue-100': myMessage.value,
        'self-end': myMessage.value,
        'self-start': !myMessage.value
      }
    })
    const date = computed<string>(() => {
      return formattedDate(+message.value.timestamp)
    })
    return {
      myMessage,
      myName,
      notMyName,
      senderName,
      messageClasses,
      date
    }
  }
})
</script>

<style scoped>
.date {
  top: -10%;
  right: 1rem
}
</style>
