<template>
  <base-container>
    <h1>TheCoaches works!</h1>
    <coach-filter></coach-filter>
    <coach-item></coach-item>
  </base-container>
</template>

<script lang="ts">
import CoachItem from '@/components/coaches/CoachItem.vue';
import CoachFilter from '@/components/coaches/CoachFilter.vue';

export default {
  components: {CoachItem, CoachFilter}
}
</script>
