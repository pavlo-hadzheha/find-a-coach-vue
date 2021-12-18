<template>
  <base-container plain="false" class="mb-4">
    <h1 class="text-2xl font-bold text-blue-400 flex justify-between">
      <span>Conversation with {{notMyName}} </span>
      <el-button type="success" circle @click="getDialog">
        <el-icon><refresh-icon /></el-icon>
      </el-button>
    </h1>
  </base-container>
  <base-container id="reply" class="mb-4">
    <el-form label-width="70px" :model="form" ref="requestForm" :rules="rules">
      <el-form-item label="Title" prop="title">
        <el-input
          v-model="form.title"
          type="text"
          ></el-input>
      </el-form-item>
      <el-form-item label="Message" prop="message">
        <el-input
          v-model="form.message"
          type="textarea"
          :rows="1"
          ></el-input>
      </el-form-item>
      <div class="flex justify-end">
        <el-button type="primary" plain @click="sendMessage">Send</el-button>
      </div>
    </el-form>
  </base-container>
  <div v-if="dialog" id="messageList">
    <message-item
      v-for="message of dialog.messages"
      :key="message.recordID"
      :message="message"
      :me="activeUser"
      :otherGuy="notMe"
      ></message-item>
  </div>
</template>

<script lang="ts">
import { IDialog, IMessage } from '@/data-structures/request';
import { IUser } from '@/data-structures/user';
import { ElLoading, ElMessage } from 'element-plus';
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex';
import MessageItem from './MessageItem.vue';

const showError = (msg: string): void => {
  ElMessage({
    type: 'error',
    message: msg,
    showClose: true,
  })
}

const showSuccess = (msg: string): void => {
  ElMessage({
    type: 'success',
    message: msg,
    showClose: true,
  })
}

export default defineComponent({
  props: ['dialogUID'],
  components: {MessageItem},
  data() {
    return {
      showError,
      showSuccess,
      dialog: null as null | IDialog,
      form: {
        title: '',
        message: '',
      },
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
  },
  computed: {
    ... mapGetters({activeUser: 'auth/activeUser', dialogs: 'messages/dialogs'}),
    notMe(): IUser {
      return (this.dialog?.user1.UID === this.activeUser?.UID 
        ? this.dialog?.user2
        : this.dialog?.user1) as IUser;
    },
    notMyName(): string {
      if(this.notMe) {
        return this.notMe?.firstName + ' ' + this.notMe?.lastName;
      } else {
        return '';
      }
    }
  },
  methods: {
    async sendMessage(): Promise<void> {
      let user: IUser = this.$store.getters['auth/activeUser'];
      const newMessage: IMessage = {
        senderUID: this.activeUser.UID,
        receiverUID: this.notMe?.UID as string,
        title: this.form.title,
        message: this.form.message,
        timestamp: Date.now().toString()
      };
      try {
        await this.$store.dispatch('messages/sendMessage', {
          message: newMessage,
          from: user,
          to: await this.$store.dispatch('users/getUser', this.notMe.UID)
        });
        this.getDialog();
        this.showSuccess('Sent!')
      } catch(err: unknown) {
        this.showError((err as Error).message);
      }
    },
    async getDialog(): Promise<void> {
      this.dialog = await this.$store.dispatch('messages/getDialog', this.dialogUID);
    }
  },
  async mounted(): Promise<void> {
    const loadingInstance = ElLoading.service({target: '#messageList'});
    await this.$store.dispatch('auth/autoLogin');
    await this.getDialog();
    loadingInstance.close();
  }
})
</script>

