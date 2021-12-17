<template>
  <el-form ref="registerForm"
           :model="form"
           :rules="validationRules"
           status-icon
           label-width="110px">

    <el-form-item label="First/last name:" ref="elem">
      <el-row justify="space-between">
        <el-col :span="11">
          <el-form-item prop="firstName">
            <el-input type="text" placeholder="Firstname.." v-model="form.firstName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item prop="lastName">
            <el-input type="text" placeholder="Lastname.." v-model="form.lastName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form-item>

    <el-form-item label="Email:" prop="email">
      <el-input type="email" placeholder="Enter your email.." v-model="form.email"></el-input>
    </el-form-item>

    <el-form-item label="Password:" prop="password">
      <el-input type="password" placeholder="Enter a password.." v-model="form.password" show-password></el-input>
    </el-form-item>

    <el-form-item label="Be a coach:">
      <el-checkbox v-model="form.isCoach" size="medium" ref="isCoach"></el-checkbox>
    </el-form-item>

    <div v-if="form.isCoach">
      <el-form-item label="About you:" prop="description">
        <el-input type="textarea" :rows="4" v-model="form.description" placeholder="Write a few words.."></el-input>
      </el-form-item>

      <el-form-item label="Hourly charge:">
        <el-input-number v-model="form.hourlyRate" min="0"></el-input-number>
        <span> $/hour</span>
      </el-form-item>

      <el-form-item label="Select skills:">
        <el-select v-model="form.skills" multiple class="w-full">
          <template v-for="skill of skillOptions" :key="skill">
            <el-option 
              :label="skill.skill"
              :value="skill.skill"
              ></el-option>
          </template>
        </el-select>
      </el-form-item>
    </div>

    <div class="flex justify-end">
      <el-button type="primary" :disabled="formIsInvalid" @click="onSubmit">Register</el-button>
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
import { CoachSkills, ICoachSkill, IUser, skillOptions } from '@/data-structures/user';
import { ElMessage } from 'element-plus';
import { mapActions } from 'vuex';

export default defineComponent({
  data() {
    const validateEmail = (_: unknown, value: string, callback: (error?: Error) => unknown): void => {
      let regexp = /^(\w+((\.|-)\w+)?\.?)+@(gmail|ukr)\.(ua|com|org|net)$/;
      if(regexp.test(value)) {
        callback();
      } else {
        callback(new Error('Enter correct email!'));
      }
    };

    const validatePassword = (_: unknown, value: string, callback: (error?: Error) => unknown): void => {
      let regexp = /^(\w|\s){8,255}$/;
      if(regexp.test(value)) {
        callback()
      } else {
        callback(new Error('Enter correct email!'));
      }
    };

    const validateDescription = (_: unknown, value: string, callback: (error?: Error) => unknown) => {
      let regexp = /^.{30,255}$/;
      if((this.$refs.isCoach as any).isChecked) {
        if(regexp.test(value)) {
          callback();
        } else {
          callback(new Error('"About you" must be within 30 and 255 characters'))
        }
      } else {
        callback()
      }
    };

    const showError = (msg: string): void => {
      ElMessage({
        type: 'error',
        message: msg,
        showClose: true,
      })
    }

    const showSuccess = (msg: string): void => {
      ElMessage({
        type: 'success',
        message: msg,
        showClose: true,
      })
    }

    return {
      skillOptions,
      showError,
      showSuccess,
      form: {
        firstName: 'Pavlo',
        lastName: 'Hadzheha',
        email: 'business.pavlo2000@gmail.com',
        password: 'qwert12345',
        description: "I am a good coach. A great one I might say. And you'll see it immediately 'cause it's true",
        isCoach: false,
        hourlyRate: 0,
        skills: ['frontend'] as Array<keyof CoachSkills>,
      },
      validationRules: {
        firstName: [
          {
            required: true,
            message: 'Please enter first name',
            trigger: 'blur',
          },
          {
            min: 2,
            max: 12,
            message: 'Length should be 2 to 12',
            trigger: 'blur',
          },
        ],
        lastName: [
          {
            required: true,
            message: 'Please enter last name',
            trigger: 'blur',
          },
          {
            min: 2,
            max: 12,
            message: 'Length should be 2 to 12',
            trigger: 'blur',
          },
        ],
        email: [
          {
            validator: validateEmail,
            trigger: 'blur',
          },
        ],
        password: [
          {
            validator: validatePassword,
            trigger: 'blur',
          },
        ],
        hourlyRate: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
          {
            min: 0,
            message: 'Min value is 0',
            trigger: 'blur',
          },
        ],
        description: [
          {
            validator: validateDescription,
            trigger: 'blur'
          }
        ]
      },
    }
  },
  computed: {
    userData(): IUser {
      let {firstName, lastName, email, isCoach, description, hourlyRate, skills: skillsStr} = this.form;
      const skills: ICoachSkill[] = this.skillOptions.filter(s => skillsStr.includes(s.skill));
      const UID = '';
      return {
        UID, firstName, lastName, email, isCoach,
        coachData: !isCoach ? null : {
          description,
          hourlyRate,
          skills
        }
      }
    }
  },
  methods: {
    ...mapActions({register: 'auth/register'}),
    onSubmit(): void {
      let form = this.$refs.registerForm as any;
      form.validate((valid: boolean) => {
        if(valid) {
          this.register({ 
            email: this.form.email,
            password: this.form.password, 
            user: this.userData
          }).then(() => {
            this.showSuccess('Successfully signed up!');
            setTimeout(() => {
              this.$router.push({name: 'TheCoaches'})
            }, 1000);
          }).catch(err => {
            this.showError(err.message);
          })
        }  
      })
    }
  }
});


</script>
<style scoped>
p {
  color: #606266
}
</style>
