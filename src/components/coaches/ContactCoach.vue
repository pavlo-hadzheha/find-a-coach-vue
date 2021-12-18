<template>
  <base-container class="">
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
          :rows="5"
          ></el-input>
      </el-form-item>
      <div class="flex justify-end">
        <el-button type="primary" plain @click="sendMessage">Send</el-button>
      </div>
    </el-form>
  </base-container>
</template>

<script lang="ts">
import { IMessage } from '@/data-structures/request';
import { IUser } from '@/data-structures/user';
import { ElMessage } from 'element-plus';
import { defineComponent } from 'vue'

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
  props: ['id'],
  data() {
    return {
      showError,
      showSuccess,
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
    };
  },
  methods: {
    async sendMessage(): Promise<void> {
      let user: IUser = this.$store.getters['auth/activeUser'];
      const newMessage: IMessage = {
        senderUID: user.UID,
        receiverUID: this.id,
        title: this.form.title,
        message: this.form.message,
        timestamp: Date.now().toString()
      };
      try {
        let other = await this.$store.dispatch('users/getUser', this.id);
        await this.$store.dispatch('messages/sendMessage', {
          message: newMessage,
          from: user,
          to: other
        });
        this.showSuccess('Sent!')
      } catch(err: unknown) {
        this.showError((err as Error).message);
      }
    }
  }
})
</script>

