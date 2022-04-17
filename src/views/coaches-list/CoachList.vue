<template>
  <section v-if="hasCoaches">
    <CoachItem v-for="coach of coaches" :key="coach.UID" :userData="coach" />
  </section>
  <section v-else class="text-2xl text-center">
    No coaches yet!
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import CoachItem from '@/views/coaches-list/CoachItem.vue'
import { IUser } from '@/types/user'
import { userStore } from '@/store'

export default defineComponent({
  components: { CoachItem },
  props: {
    coaches: {
      type: Object as PropType<Array<IUser> | null>,
      required: true
    }
  },
  setup () {
    return {
      hasCoaches: computed((): boolean => userStore.hasCoaches)
    }
  }
})
</script>
