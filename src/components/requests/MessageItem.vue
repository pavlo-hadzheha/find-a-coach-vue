<template>
  <div class="container m-auto max-w-screen-md mb-2 flex flex-col">
    <div class="p-6 rounded-lg shadow-lg duration-200 w-5/6" :class="messageClasses">
      <div class="relative">
        <h1 class="font-bold">{{senderName}}: {{message.title}}</h1>
        <p>{{message.message}}</p>
        <span class="absolute date font-thin">{{date}}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { IMessage } from '@/data-structures/request'
import { IUser } from '@/data-structures/user';
import { defineComponent, PropType } from 'vue'

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
    },
  },
  computed: {
    myMessage(): boolean {
      return this.message.senderUID === this.me.UID;
    },
    myName(): string {
      return this.me.firstName + ' ' + this.me.lastName;
    },
    notMyName(): string {
      return this.otherGuy.firstName + ' ' + this.otherGuy.lastName;
    },
    senderName(): string {
      return this.myMessage ? 'Me' : this.notMyName;
    },
    messageClasses(): any {
      return {
        'bg-yellow-100': !this.myMessage,
        'bg-blue-100': this.myMessage,
        'self-end': this.myMessage,
        'self-start': !this.myMessage,
      }
    },
    date(): string {
      const date =  new Date(+this.message.timestamp);
      const monthDay = date.getDate();
      const month = date.getMonth() + 1;
      const year = String(date.getFullYear()).slice(-2);
      const hours = String(date.getHours()).padStart(2,'0');
      const minutes = String(date.getMinutes()).padStart(2,'0');
      return `${monthDay}.${month}.${year} - ${hours}:${minutes}`;
    }
  },
  methods: {
  }
})
</script>

<style scoped>
.date {
  top: -10%;
  right: 1rem
}
</style>

