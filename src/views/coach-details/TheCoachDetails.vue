<template>
  <section
    v-if="selectedCoach"
    id="coachDetails"
    class="grid grid-cols-1 gap-4"
  >
    <div>
      <base-container>
        <h4 class="text-2xl font-bold text-blue-500">
          {{ name }} (${{ selectedCoach.coachData.hourlyRate }}/hour)
        </h4>
      </base-container>
    </div>
    <div>
      <base-container>
        <header class="flex items-center justify-between">
          <h2 v-if="userIsAuthenticated" class="text-lg font-bold text-red-400">
            Interested? Reach out now!
          </h2>
          <h2 v-else class="text-lg font-bold text-red-400">
            Interested? Login to reach out!
          </h2>
          <router-link
            v-if="!isContactPage && userIsAuthenticated"
            :to="contactLink"
          >
            <ElButton type="success" round>Contact</ElButton>
          </router-link>
          <router-link v-else-if="!userIsAuthenticated" to="/auth/login">
            <ElButton type="success" round>Login</ElButton>
          </router-link>
          <router-link v-else :to="closeLink">
            <ElButton type="danger" round>Close</ElButton>
          </router-link>
        </header>
        <router-view #default="{Component}">
          <transition name="slide-fade">
            <component :is="Component" />
          </transition>
        </router-view>
      </base-container>
    </div>
    <div>
      <base-container>
        <div class="flex mb-2 gap-1">
          <el-tag
            v-for="skill of selectedCoach.skills"
            :key="skill"
            :type="skill.tagType"
          >
            {{ skill.skill }}
          </el-tag>
        </div>
        <h2 class="text-2xl font-bold text-blue-400">About</h2>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam optio
          excepturi, natus deserunt, ullam rem unde non accusamus quam
          laboriosam pariatur reiciendis enim quos culpa saepe porro asperiores.
          Architecto exercitationem eos natus facere numquam, odit dolor labore
          delectus ut quisquam nam distinctio soluta harum quasi deleniti?
          Impedit voluptate itaque, nisi ducimus laudantium autem! Ipsum
          laboriosam libero rerum quod sed dignissimos, magnam eveniet porro
          temporibus excepturi dicta aliquam repudiandae commodi beatae eos
          possimus, alias qui esse hic, delectus magni inventore blanditiis quo
          labore. Quisquam praesentium reiciendis soluta impedit molestias nisi
          possimus facere natus minus corrupti? Vero amet nihil quidem enim
          rerum.
        </p>
      </base-container>
    </div>
  </section>
</template>

<script lang="ts">
import { IUser, TNullableField } from '@/types'
import { computed, defineComponent, onMounted, ref } from 'vue'
import { authStore, userStore } from '@/store'
import { routeNames } from '@/router'
import { useRoute } from 'vue-router'

export default defineComponent({
  props: {
    id: {
      required: true,
      type: String
    }
  },
  setup (props) {
    const id = ref(props.id)
    const route = useRoute()
    const loading = ref(false)

    const selectedCoach = computed<IUser>(() => {
      return userStore.coaches.find((c) => c.UID === id.value) as IUser
    })

    const name = computed<TNullableField<string>>(() => {
      const coach = selectedCoach.value
      return coach?.firstName + ' ' + coach?.lastName
    })
    const contactLink = computed(() => {
      return {
        name: routeNames.coachContact,
        params: {
          id: id.value
        }
      }
    })
    const closeLink = computed(() => {
      return {
        name: routeNames.coachDetails,
        params: {
          id: id.value
        }
      }
    })
    const isContactPage = computed<boolean>(() => {
      return route.name === routeNames.coachContact
    })

    const userIsAuthenticated = computed<boolean>(
      () => authStore.userIsAuthenticated
    )

    onMounted(async () => {
      loading.value = true
      await userStore.setUsers()
      loading.value = false
    })

    return {
      loading,
      name,
      isContactPage,
      userIsAuthenticated,
      closeLink,
      contactLink,
      selectedCoach
    }
  }
})
</script>
