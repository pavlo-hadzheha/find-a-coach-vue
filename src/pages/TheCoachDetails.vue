<template>
  <section v-if="selectedCoach" class="grid grid-cols-1 gap-4" id="coachDetails">
    <div>
      <base-container>
        <h4 class="text-2xl font-bold text-blue-500">{{name}} (${{selectedCoach.coachData.hourlyRate}}/hour)</h4>
      </base-container>
    </div>
    <div>
      <base-container>
        <header class="flex items-center justify-between">
          <h2 class="text-lg font-bold text-red-400" v-if="userIsAuthenticated">Interested? Reach out now!</h2>
          <h2 class="text-lg font-bold text-red-400" v-else>Interested? Login to reach out!</h2>
          <router-link :to="contactLink" v-if="!isContactPage && userIsAuthenticated">
            <el-button type="success" round>Contact</el-button>
          </router-link>
          <router-link to="/auth/login" v-else-if="!userIsAuthenticated">
            <el-button type="success" round>Login</el-button>
          </router-link>
          <router-link :to="closeLink" v-else>
            <el-button type="danger" round>Close</el-button>
          </router-link>
        </header>
        <router-view></router-view>
      </base-container>
    </div>
    <div>
      <base-container>
        <div class="flex mb-2 gap-1">
          <el-tag v-for="skill of selectedCoach.skills" :key="skill" :type="skill.tagType">
            {{skill.skill}}
          </el-tag>
        </div>
        <h2 class="text-2xl font-bold text-blue-400">About</h2>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam optio excepturi, natus deserunt, ullam rem unde non accusamus quam laboriosam pariatur reiciendis enim quos culpa saepe porro asperiores. Architecto exercitationem eos natus facere numquam, odit dolor labore delectus ut quisquam nam distinctio soluta harum quasi deleniti? Impedit voluptate itaque, nisi ducimus laudantium autem! Ipsum laboriosam libero rerum quod sed dignissimos, magnam eveniet porro temporibus excepturi dicta aliquam repudiandae commodi beatae eos possimus, alias qui esse hic, delectus magni inventore blanditiis quo labore. Quisquam praesentium reiciendis soluta impedit molestias nisi possimus facere natus minus corrupti? Vero amet nihil quidem enim rerum.</p>
      </base-container>
    </div>
  </section>
</template>

<script lang="ts">
import { IUser } from '@/data-structures/user';
import { ElLoading } from 'element-plus';
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex';

let loadingInstance: any;

export default defineComponent({
  props: ['id'],
  computed: {
    ... mapGetters({userIsAuthenticated: 'auth/userIsAuthenticated'}),
    name(): string {
      return this.selectedCoach?.firstName + ' ' + this.selectedCoach?.lastName;
    },
    contactLink(): string {
      return this.$route.path + '/contact';
    },
    closeLink() {
      return {
        name: 'TheCoachDetails',
        params: {
          id: this.id
        }
      }
    },
    selectedCoach(): IUser {
      const coaches = this.$store.getters['users/coaches'];
      if(coaches) loadingInstance.close();
      return coaches.find((c: IUser) => c.UID === this.id);
    },
    isContactPage(): boolean {
      return this.$route.name === 'ContactCoach'
    }
  },
  created(): void {
    loadingInstance = ElLoading.service({target: "#coachDetails"});
  }
})
</script>

