<template>
  <the-header></the-header>
  <main class="px-2 mb-8" id="main">
    <router-view/>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  async created(): Promise<void> {
    await this.$store.dispatch('users/set');
    await this.$store.dispatch('auth/autoLogin');
  }
})
</script>

