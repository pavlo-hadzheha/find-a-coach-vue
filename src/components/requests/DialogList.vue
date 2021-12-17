<template>
  <dialog-item
    v-for="dialog of dialogs"
    :key="dialog[0].coachUID"
    :dialog="dialog"
    ></dialog-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DialogItem from './DialogItem.vue';

export default defineComponent({
  props: ['dialogs'],
  components: {DialogItem}
})
</script>


