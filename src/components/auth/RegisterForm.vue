<template>
  <el-form ref="form" :model="form" label-width="110px">
    <el-form-item label="First/last name:">
      <el-row justify="space-between">
        <el-col :span="11">
          <el-input placeholder="Firstname.." v-model="firstName"></el-input>
        </el-col>
        <el-col :span="11">
          <el-input placeholder="Lastname.." v-model="lastName"></el-input>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item label="Email:">
      <el-input placeholder="Enter your email.." v-model="email"></el-input>
    </el-form-item>
    <el-form-item label="Password:">
      <el-input placeholder="Enter a password.." v-model="password"></el-input>
    </el-form-item>
    <el-form-item label="Hourly charge:">
      <el-input-number v-model="hourlyRate"></el-input-number>
      <span> $/hour</span>
    </el-form-item>
    <el-form-item label="Select skills:">
      <el-select v-model="skills" multiple class="w-full">
        <template v-for="(color, skill) of skillOptions" :key="skill">
          <el-option 
            :label="skill"
            :value="skill"
            :style="{backgroundColor: color}"
            ></el-option>
        </template>
      </el-select>
    </el-form-item>
    <div class="flex justify-end">
      <el-button type="primary" :disabled="formIsInvalid">Register</el-button>
    </div>
    <div class="p-2">
      <p class="text-center text-gray-400">
        Already have an account? 
        <router-link to="/auth/login">
          <span class="text-blue-400 hover:underline">
            Login!
          </span>
        </router-link>
      </p>
    </div>
  </el-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CoachSkills, ICoachRequest } from '@/data-structures/coach';
import { mapGetters, mapActions } from 'vuex';

export default defineComponent({
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      hourlyRate: null as null | number,
      skills: [] as Array<keyof CoachSkills>
    }
  },
  computed: {
    name(): string {
      return this.firstName + ' ' + this.lastName;
    },
    formIsInvalid(): boolean {
      return !(this.firstName && this.lastName && this.email && this.password);
    },
    ... mapGetters(['skillOptions'])
  },
  methods: {
    ... mapActions(['getCoaches', "emailSignUp"]),
    register(): void {
      const coach: ICoachRequest = {
        name: this.name,
        hourlyRate: this.hourlyRate === null ? 0 : this.hourlyRate,
        skills: this.skills,
      }
      this.emailSignUp({
        coach: coach,
        password: this.password,
        email: this.email
      }).then(() => {
        this.getCoaches();
      })
    }
  }
})
</script>

<style scoped>
p {
  color: #606266
}
</style>
