<template>
  <base-container class="mb-2">
    <div class="relative">
      <h1 class="font-bold">{{message.title}}</h1>
      <p>{{message.message}}</p>
      <span class="absolute date font-thin">{{date}}</span>
    </div>
  </base-container>
</template>

<script lang="ts">
import { IMessage } from '@/data-structures/request'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    message: {
      required: true,
      type: Object as PropType<IMessage>
    }
  },
  computed: {
    date(): string {
      const date =  new Date(+this.message.timestamp);
      const monthDay = date.getDate();
      const month = date.getMonth() + 1;
      const year = String(date.getFullYear()).slice(-2);
      const hours = String(date.getHours()).padStart(2,'0');
      const minutes = String(date.getMinutes()).padStart(2,'0');
      return `${monthDay}.${month}.${year} - ${hours}:${minutes}`;
    }
  },
  methods: {
  }
})
</script>

<style scoped>
.date {
  top: -10%;
  right: 1rem
}
</style>

