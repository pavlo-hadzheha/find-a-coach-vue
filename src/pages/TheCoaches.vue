<template>
  <base-container class="mb-4" title="CoachList">
    <coach-filter v-model="checkedSkills"></coach-filter>
  </base-container>
  <base-container id="coachList">
    <div class="flex justify-end mb-4">
      <router-link class="hover:underline" :to="becomeCoachLink">
        <el-button type="success">Become a Coach</el-button>
      </router-link>
    </div>
    <coach-list :coaches="filteredCoaches"></coach-list>
  </base-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CoachFilter from '@/components/coaches/CoachFilter.vue';
import CoachList from '@/components/coaches/CoachList.vue';
import { IUser, CoachSkills, CoachData, ICoachSkill } from '@/data-structures/user';
import { ElLoading } from 'element-plus';
import { mapGetters } from 'vuex';

export default defineComponent({
  data() {
    return {
      checkedSkills: [] as Array<keyof CoachSkills>
    }
  },
  components: {CoachFilter, CoachList},
  computed: {
    ... mapGetters({userIsAuthenticated: 'auth/userIsAuthenticated'}),
    becomeCoachLink(): string {
      return this.userIsAuthenticated ? '/profile' : '/auth/register';
    },
    filteredCoaches(): Array<IUser> | null {
      let coachList = this.$store.getters['users/coaches'];
      return coachList.filter((c: IUser) => {
        let coachSkills = (c.coachData as CoachData).skills;
        if(coachSkills) {
          const mappedCoachSkills = coachSkills.map((c:  ICoachSkill) => c.skill);
          return this.checkedSkills.every(s => mappedCoachSkills.includes(s));
        } else {
          return false;
        }
      });
    }
  },
  async created() {
    const loadingInstance = ElLoading.service({target: 'coachList'});
    await this.$store.dispatch('users/set');
    loadingInstance.close();
  }
});
</script>
