<template>
   <div class="container m-auto max-w-screen-md">
      <h1 v-if="title" class="mb-4 font-sans text-2xl font-bold text-white">{{title}}</h1>
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
