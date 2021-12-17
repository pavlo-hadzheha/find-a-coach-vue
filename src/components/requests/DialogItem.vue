<template>
  <base-container :id="coachUID">
    <div v-if="coach" class="flex justify-between items-center">
      <div class="dialogData">
        <h4 class="font-bold text-blue-500 text-md">
          {{coach.firstName + ' ' + coach.lastName}}
          <span>[{{lastMessageDate}}]</span>
        </h4>
        <div v-if="dialog">
          <h5>{{lastMessage.title}}</h5>
          <p>{{lastMessage.message.slice(0,20)}}...</p>
        </div>
      </div>
      <div class="actions">
        <router-link :to="'/requests/' + coachUID">
          <el-button type="primary" plain>View history</el-button>
        </router-link>
      </div>
    </div>
  </base-container>
</template>

<script lang="ts">
import { IMessage } from '@/data-structures/request'
import { IUser } from '@/data-structures/user';
import { ElLoading } from 'element-plus';
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  data() {
    return {
      coach: null as null | IUser
    }
  },
  props: {
    dialog: {
      required: true,
      type: Object as PropType<IMessage[]>
    }
  },
  computed: {
    coachUID(): string {
      return this.dialog[0].coachUID;
    },
    lastMessage(): IMessage {
      return this.dialog[0];
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
  async mounted(): Promise<void> {
    const loadingInstance = ElLoading.service({target: `#${this.coachUID}`});
    this.coach = await this.$store.dispatch('users/getUser', this.coachUID);
    loadingInstance.close();
  }

})
</script>

