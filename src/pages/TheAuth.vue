<template>
  <base-container class="w-full p-8 sm:w-128" :title="caption">
    <router-view/>
  </base-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  computed: {
    caption(): string {
      let routeName = this.$route.name;
      return routeName === 'Register' ? 'Register' : 'Login';
    } 
  }
})
</script>

