<template>
  <el-card shadow="hover" class="mb-2">
    <el-row justify="space-between" align="middle">
      <el-col :span="12">
        <h4 class="text-2xl font-bold text-blue-500">{{name}} (${{userData.coachData.hourlyRate}}/hour)</h4>
        <div class="flex mt-2 gap-1">
          <el-tag v-for="skill of userData.coachData.skills" :key="skill" :type="skill.tagType">
            {{skill.skill}}
          </el-tag>
        </div>
      </el-col>
      <el-col :span="8" class="flex justify-end w-full gap-2 items-center">
        <router-link :to="coachURL">
          <el-button type="primary" round>View details</el-button>
        </router-link>
        <router-link :to="contactLink" v-if="userIsAuthenticated">
          <el-button type="success" circle><el-icon><message-icon /></el-icon></el-button>
        </router-link>
      </el-col>
    </el-row>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IUser, skillOptions } from '@/data-structures/user';
import { mapGetters } from 'vuex';

export default defineComponent({
  data() {
    return {
      skillOptions
    }
  },
  props: {
    userData: {
      type: Object as PropType<IUser>,
      required: true
    }
  },
  computed: {
    ... mapGetters({userIsAuthenticated: 'auth/userIsAuthenticated'}),
    name(): string {
      return this.userData.firstName + ' ' + this.userData.lastName;
    },
    contactLink() {
      return {
        name: "ContactCoach",
        params: {
          id: this.userData.UID
        }
      }
    },
    coachURL() {
      return {
        name: "TheCoachDetails",
        params: {
          id: this.userData.UID
        }
      }
    }
  }

})
</script>

