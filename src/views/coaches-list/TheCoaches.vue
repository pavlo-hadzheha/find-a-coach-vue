<template>
  <base-container class="mb-4" title="CoachList">
    <CoachFilter v-model="checkedSkills" />
  </base-container>

  <base-container id="coachList">
    <div class="flex justify-end mb-4">
      <router-link class="hover:underline" :to="becomeCoachLink">
        <ElButton type="success">Become a Coach</ElButton>
      </router-link>
    </div>
    <CoachList :coaches="filteredCoaches" />
  </base-container>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import CoachFilter from './CoachFilter.vue'
import CoachList from './CoachList.vue'
import { IUser, ICoachSkills, ICoachData, ICoachSkill } from '@/types'
import { ElLoading } from 'element-plus'
import { authStore, userStore } from '@/store'
import { routeNames } from '@/router'

export default defineComponent({
  components: { CoachFilter, CoachList },
  setup () {
    async function getUsers () {
      const loadingInstance = ElLoading.service({ target: 'coachList' })
      await userStore.setUsers()
      loadingInstance.close()
    }

    const checkedSkills = ref<Array<keyof ICoachSkills>>([])

    const filteredCoaches = computed<Array<IUser>>(() => {
      return userStore.coaches.filter((c: IUser) => {
        const coachSkills = (c.coachData as ICoachData).skills
        if (coachSkills) {
          const mappedCoachSkills = coachSkills.map(
            (c: ICoachSkill) => c.skill
          )
          return checkedSkills.value.every((s) =>
            mappedCoachSkills.includes(s)
          )
        } else {
          return false
        }
      })
    })

    const becomeCoachLink = computed(() => {
      return authStore.userIsAuthenticated
        ? { name: routeNames.profile }
        : { name: routeNames.signUp }
    })

    onMounted(getUsers)

    return {
      checkedSkills,
      filteredCoaches,
      becomeCoachLink
    }
  }
})
</script>
