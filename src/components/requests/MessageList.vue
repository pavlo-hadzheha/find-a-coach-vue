<template>
  <base-container plain="false" class="mb-4">
    <h1 class="text-2xl font-bold text-blue-400">Messages</h1>
  </base-container>
  <message-item
    v-for="message of messages"
    :key="message.recordID"
    :message="message"
    ></message-item>
</template>

<script lang="ts">
import { IMessage } from '@/data-structures/request';
import { defineComponent } from 'vue'
import MessageItem from './MessageItem.vue';

export default defineComponent({
  props: ['coachUID'],
  components: {MessageItem},
  mounted(): void {
    console.log(this.coachUID)
  },
  computed: {
    messages(): IMessage[] {
      const dialogs = this.$store.getters['messages/dialogs'] as IMessage[][];
      const messages = dialogs.find(msgs => msgs.some(m => m.coachUID === this.coachUID)) as IMessage[];
      messages.sort((a, b) => +a.timestamp - +b.timestamp);
      return messages;
    }
  },
  methods: {

  }
})
</script>

