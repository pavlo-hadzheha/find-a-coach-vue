<template>
  <ElCard shadow="hover" class="mb-2">
    <ElRow justify="space-between" align="middle">
      <ElCol :span="12">
        <h4 class="text-2xl font-bold text-blue-500">
          {{ fullName }} (${{ userData.coachData.hourlyRate }}/hour)
        </h4>
        <div class="flex mt-2 gap-1">
          <ElTag
            v-for="skill of userData.coachData.skills"
            :key="skill"
            :type="skill.tagType"
          >
            {{ skill.skill }}
          </ElTag>
        </div>
      </ElCol>
      <ElCol :span="8" class="flex justify-end w-full gap-2 items-center">
        <router-link :to="'/coaches/' + userData.UID">
          <ElButton type="primary" round>View details</ElButton>
        </router-link>
        <router-link
          v-if="userIsAuthenticated"
          :to="'/coaches/' + userData.UID + '/contact'"
        >
          <ElButton type="success" circle>
            <ElIcon><message-icon /></ElIcon>
          </ElButton>
        </router-link>
      </ElCol>
    </ElRow>
  </ElCard>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs } from 'vue'
import { IUser, skillOptions } from '@/types/user'
import { authStore } from '@/store'
import { routeNames } from '@/router'

export default defineComponent({
  props: {
    userData: {
      type: Object as PropType<IUser>,
      required: true
    }
  },
  setup (props: { userData: IUser }) {
    const { userData } = toRefs(props)
    const contactLink = computed(() => {
      return {
        name: routeNames.coachContact,
        params: {
          id: userData.value.UID
        }
      }
    })
    const coachURL = computed(() => {
      return {
        name: routeNames.coachDetails,
        params: {
          id: userData.value.UID
        }
      }
    })
    const fullName = computed(
      () => userData.value.firstName + ' ' + userData.value.lastName
    )
    const userIsAuthenticated = computed(() => authStore.userIsAuthenticated)
    return {
      skillOptions,
      contactLink,
      coachURL,
      userIsAuthenticated,
      fullName
    }
  }
})
</script>
