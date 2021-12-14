<template>
  <base-container>
    <h1>TheRequests works!</h1>
    <request-item></request-item>
  </base-container>
</template>

<script lang="ts">
import RequestItem from '@/components/requests/RequestItem.vue';
export default {
  components: { RequestItem }
};
</script>


