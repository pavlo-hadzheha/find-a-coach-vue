<template>
  <base-container
    class="w-full p-8 sm:w-128"
    title="Login"
  >
    <ElForm
      ref="loginForm"
      v-loading="loading"
      :model="form"
      label-width="70px"
      @submit="onSubmit"
    >
      <ElFormItem label="Email">
        <ElInput
          v-model="form.email"
          placeholder="Enter your email.."
          type="email"
        />
      </ElFormItem>
      <ElFormItem label="Password">
        <ElInput
          v-model="form.password"
          placeholder="Enter a password.."
          type="password"
          show-password
        />
      </ElFormItem>
      <div class="flex justify-end">
        <ElButton type="primary" @click="onSubmit">Login</ElButton>
      </div>
      <div class="p-2">
        <p class="text-center text-gray-400">
          Don't have an account yet?
          <router-link to="/auth/register">
            <span class="text-blue-400 hover:underline"> Register Now! </span>
          </router-link>
        </p>
      </div>
    </ElForm>
  </base-container>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { authStore } from '@/store'
import { useRouter } from 'vue-router'
import { routeNames } from '@/router'

import { ElMessage } from 'element-plus'

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
  },

  setup () {
    const loading = ref(false)

    const router = useRouter()

    const form = reactive({
      email: 'business.pavlo2000@gmail.com',
      password: 'qwert12345'
    })

    function onSubmit (): void {
      loading.value = true
      authStore
        .signIn({
          email: form.email,
          password: form.password
        })
        .then((authData) => authStore.setActiveUser(authData.userUID))
        .then(() => {
          showSuccess('Successfully logged in!')
          setTimeout(() => {
            router.push({ name: routeNames.coachesList })
          }, 1000)
        })
        .catch((err: unknown) => {
          console.dir(err)
          showError((err as Error).message)
        })
        .finally(() => {
          loading.value = true
        })
    }
    return {
      loading,
      onSubmit,
      form
    }
  }
})
</script>
