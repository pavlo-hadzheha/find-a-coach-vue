<template>
  <header class="mb-6 header">
    <div
      id="brand"
      class="font-sans text-3xl font-bold text-blue-500 rounded-lg"
    >
      <router-link to="/"> Find a Coach </router-link>
    </div>
    <nav id="nav">
      <router-link
        :to="{ name: $routeNames.coachesList }"
        class="relative nav-item"
      >
        <ElButton class="nav-item-btn" type="text" round>Coaches</ElButton>
      </router-link>
      <router-link
        v-if="userIsAuthenticated"
        :to="{ name: $routeNames.dialogs }"
        class="relative nav-item"
      >
        <ElButton class="nav-item-btn" type="text">Dialogs</ElButton>
      </router-link>
      <template v-if="!userIsAuthenticated">
        <router-link
          :to="{ name: $routeNames.signIn }"
          class="relative nav-item"
        >
          <ElButton class="nav-item-btn" type="text">SignIn</ElButton>
        </router-link>
        <router-link
          :to="{ name: $routeNames.signUp }"
          class="relative nav-item"
        >
          <ElButton class="nav-item-btn" type="text">SignUp</ElButton>
        </router-link>
      </template>
      <template v-else>
        <ElButton @click="logout">LogOut</ElButton>
        <router-link to="/profile">
          <ElButton type="primary" circle>
            <ElIcon>
              <user-icon />
            </ElIcon>
          </ElButton>
        </router-link>
      </template>
    </nav>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { authStore } from '@/store'
import { ElButton, ElIcon } from 'element-plus'

export default defineComponent({
  components: {
    ElIcon,
    ElButton
  },
  setup () {
    const userIsAuthenticated = computed<boolean>(
      () => authStore.userIsAuthenticated
    )
    onMounted(async function () {
      await authStore.autoSignIn()
    })
    return {
      userIsAuthenticated,
      logout: authStore.signOut
    }
  }
})
</script>

<style scoped>
.header {
  @apply bg-green-200 duration-200 py-6 px-8 flex items-center;
}
#nav {
  @apply flex justify-end items-center gap-8 flex-grow;
}

.nav-item-btn {
  @apply font-bold hover:text-blue-600 text-blue-500 text-lg duration-200;
}

.nav-item {
  min-width: 90px;
  text-align: center;
}

.nav-item.router-link-active::before {
  content: "";
  @apply absolute bottom-0 left-0 right-0 h-1 bg-blue-600 duration-300;
}
</style>
