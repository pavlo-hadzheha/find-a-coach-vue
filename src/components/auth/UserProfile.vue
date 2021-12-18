<template>
  <base-container class="mb-6" v-if="activeUser" title="Profile">
    <div class="flex justify-between">
      <h4 class="text-2xl font-bold text-blue-500">
        {{name}} 
        <span v-if="activeUser.isCoach">(${{activeUser.coachData.hourlyRate}}/hour)</span>
      </h4>
      <el-button type="warning" @click="openEdit">Edit</el-button>
    </div>
    <div class="mb-2">
      <p class="italic font-bold">{{activeUser.email}}</p>
      <div class="flex mt-2 gap-1" v-if="activeUser.isCoach">
        <el-tag v-for="skill of activeUser.coachData.skills" :key="skill" :type="skill.tagType">
          {{skill.skill}}
        </el-tag>
      </div>
    </div>
    <p class="text-xs text-gray-400">Click <i class="text-yellow-400">Edit</i> to add coach data and start earning money!</p>
  </base-container>
  <base-container v-if="editMode" class="mb-24" id="editFormContainer">
    <el-form ref="editForm"
             :rules="rules"
             :model="form"
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

      <el-form-item label="Be a coach:">
        <label class="text-xs text-gray-400">
          <el-checkbox v-model="form.isCoach" size="medium" ref="isCoach"></el-checkbox>
          (checking this will 
          <i class="text-red-500">remove</i>
          /
          <i class="text-green-500">add</i> you from/to the list of coaches)</label>
      </el-form-item>

      <div v-if="form.isCoach">
        <el-form-item label="About you:" prop="description">
          <el-input type="textarea" :rows="4" v-model="form.description" placeholder="Write a few words.." ref="isCoach"></el-input>
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
        <el-button type="danger" @click="closeEdit">Close</el-button>
        <el-button type="success" @click="saveChanges">Save Changes</el-button>
      </div>
    </el-form>
  </base-container>
</template>

<script lang="ts">
import { ICoachSkill, IUser, skillOptions } from '@/data-structures/user'
import { defineComponent } from 'vue'
import { ElMessage } from 'element-plus'
import { ElLoading } from 'element-plus'

export default defineComponent({
  data() {
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
        showClose: true
      })
    }

    const showSuccess = (msg: string): void => {
      ElMessage({
        type: 'success',
        message: msg,
        showClose: true
      })
    }
    return {
      editMode: false,
      skillOptions,
      showError,
      showSuccess,
      form: {
        firstName: '',
        lastName: '',
        isCoach: false,
        description: '',
        skills: [] as string[],
        hourlyRate: 0,
      },
      activeUser: null as null | IUser,
      rules: {
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
      }
    }
  },
  computed: {
    name(): string {
      return this.activeUser?.firstName + ' ' + this.activeUser?.lastName
    },
  },
  methods: {
    openEdit(): void {
      this.editMode = true;
    },
    closeEdit(): void {
      this.editMode = false;
    },
    patchedUser(): IUser | null {
      if(this.activeUser) {
        const skills: ICoachSkill[] = this.skillOptions.filter(s => this.form.skills.includes(s.skill));
        return {
          ... this.activeUser,
          firstName: this.form.firstName,
          lastName: this.form.lastName,
          isCoach: this.form.isCoach,
          coachData: !this.form.isCoach ? null : {
            description: this.form.description,
            skills: skills,
            hourlyRate: this.form.hourlyRate
          }
        }
      }
      return null;
    },
    initForm(): void {
      if(this.activeUser) {
        this.form.firstName = this.activeUser.firstName;
        this.form.lastName = this.activeUser.lastName;
        this.form.isCoach = this.activeUser.isCoach;
        if(this.activeUser.isCoach && this.activeUser.coachData) {
          this.form.description = this.activeUser.coachData.description;
          this.form.skills = this.activeUser.coachData.skills.map(s => s.skill);
          this.form.hourlyRate = this.activeUser.coachData.hourlyRate;
        }
      }
    },
    saveChanges(): void {
      let form = this.$refs.editForm as any;
      form.validate(async (valid: boolean) => {
        if(valid) {
          const loadingInstance = ElLoading.service({target: '#editFormContainer'});
          try {
            await this.$store.dispatch('users/updateUser', this.patchedUser())
            this.showSuccess('Successfully updated data!');
            this.editMode = false;
            loadingInstance.close();
            this.getUser();
          } catch(err: any){
            this.showError(err.message);
          } 
        }  
      })
    },
    async getUser(): Promise<void> {
      let userUID = this.$store.getters['auth/userID'];
      this.activeUser = await this.$store.dispatch('users/getUser', userUID)
      this.initForm();
    },
  },
  async mounted() {
    const loadingInstance = ElLoading.service({body: true})
    this.$store.dispatch('auth/autoLogin');
    await this.getUser()
    loadingInstance.close();
  }
})
</script>

