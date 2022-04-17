<template>
  <!--todo: This layout is just an example. Please create your own depending on your projects needs  -->
  <TheHeader />

  <div class="flex-grow p-4">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TheHeader from './TheHeader.vue'

export default defineComponent({
  name: 'DefaultLayout',
  components: { TheHeader }
})
</script>
