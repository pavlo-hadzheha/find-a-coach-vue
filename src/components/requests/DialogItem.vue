<template>
  <base-container :id="'ID' + coachUID">
    <div class="flex items-center justify-between">
      <div class="dialogData">
        <h4 class="font-bold text-blue-500 text-md">
          Conversation with {{notMyName}}
          <span class="text-sm text-blue-300">[last {{lastMessageDate}}]</span>
        </h4>
        <div v-if="dialog">
          <h5><span class="font-bold">{{lastMessageFromMe ? 'Me' : notMyName}}</span>: {{lastMessage.title}}</h5>
          <p><span class="font-bold">Message</span>: {{lastMessage.length > 20 ? lastMessage.message.slice(0,20): lastMessage.message}}...</p>
        </div>
      </div>
      <div class="actions">
        <router-link :to="'/requests/' + dialog.recordID">
          <el-button type="primary" plain>View history</el-button>
        </router-link>
      </div>
    </div>
  </base-container>
</template>

<script lang="ts">
import { IDialog, IMessage } from '@/data-structures/request'
import { IUser } from '@/data-structures/user';
import { defineComponent, PropType } from 'vue'
import { mapGetters } from 'vuex';

export default defineComponent({
  props: {
    dialog: {
      required: true,
      type: Object as PropType<IDialog>
    }
  },
  computed: {
    ... mapGetters({activeUser: 'auth/activeUser'}),
    lastMessage(): IMessage {
      return this.dialog.messages[0];
    },
    notMyName(): string {
      return this.notMe.firstName + ' ' + this.notMe.lastName;
    },
    notMe(): IUser {
      return this.dialog.user1.UID === this.activeUser.UID 
        ? this.dialog.user2
        : this.dialog.user1;
    },
    lastMessageFromMe(): boolean {
      return this.lastMessage.senderUID === this.activeUser.UID;
    },
    lastMessageDate(): string {
      const date =  new Date(+this.lastMessage.timestamp);
      const monthDay = date.getDate();
      const month = date.getMonth() + 1;
      const year = String(date.getFullYear()).slice(-2);
      const hours = String(date.getHours()).padStart(2,'0');
      const minutes = String(date.getMinutes()).padStart(2,'0');
      return `${monthDay}.${month}.${year} - ${hours}:${minutes}`;
    }
  },
})
</script>

