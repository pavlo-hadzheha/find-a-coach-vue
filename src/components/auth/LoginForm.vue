<template>
  <el-form 
    :model="form"
    ref="loginForm" 
    @submit="onSubmit"
    label-width="70px">
    <el-form-item label="Email">
      <el-input placeholder="Enter your email.." type="email" v-model="form.email"></el-input>
    </el-form-item>
    <el-form-item label="Password">
      <el-input placeholder="Enter a password.." type="password" v-model="form.password" show-password></el-input>
    </el-form-item>
    <div class="flex justify-end">
      <el-button type="primary" @click="onSubmit">Login</el-button>
    </div>
    <div class="p-2">
      <p class="text-center text-gray-400">
        Don't have an account yet? 
        <router-link to="/auth/register">
          <span class="text-blue-400 hover:underline">
            Register Now!
          </span>
        </router-link>
      </p>
    </div>
  </el-form>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import { ElMessage } from 'element-plus';
import { mapActions } from 'vuex';

export default defineComponent({

  data() {
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
    return {
      showError,
      showSuccess,
      form: {
        email: 'business.pavlo2000@gmail.com',
        password: 'qwert12345',
      },
    }
  },

  methods: {
    ...mapActions({login: 'auth/login'}),
    onSubmit(): void {
      this.login({ 
        email: this.form.email,
        password: this.form.password, 
      }).then(() => {
        this.showSuccess('Successfully logged in!');
        setTimeout(() => {
          this.$router.push({name: 'TheCoaches'})
        }, 1000);
      }).catch(err => {
        this.showError(err.message);
      })
    }
  }
});
</script>
