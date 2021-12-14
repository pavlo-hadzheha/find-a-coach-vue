<template>
   <div class="container m-auto">
      <h1 v-if="title" class="font-sans font-bold text-white text-2xl mb-4">{{title}}</h1>
      <div class="p-6 bg-white rounded-lg shadow-lg duration-200">
         <slot></slot>
      </div>
   </div>
</template> 

<script lang="ts">
export default {
   props: ['title']
}
</script>
