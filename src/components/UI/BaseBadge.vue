<template>
   <div class="rounded-2xl">
      <slot></slot>
   </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
   props: ['type']
})
</script>

