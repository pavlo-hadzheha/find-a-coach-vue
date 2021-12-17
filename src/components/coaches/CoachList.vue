<template>
    <section v-if="hasCoaches">
      <coach-item v-for="coach of coaches" :key="coach.UID" :userData="coach"></coach-item>
    </section>
    <section v-else class="text-2xl text-center">
      No coaches yet!
    </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import CoachItem from '@/components/coaches/CoachItem.vue';
import { mapGetters } from 'vuex';
import { IUser } from '@/data-structures/user';

export default defineComponent({
  components: {CoachItem},
  props: {
    coaches: {
      type: Object as PropType<Array<IUser> | null>,
      required: true
    }
  },
  computed: {
    ...mapGetters({ hasCoaches: 'users/hasCoaches' }),
  },
})
</script>

