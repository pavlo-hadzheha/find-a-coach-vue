<template>
  <BaseContainer class="w-full p-8 sm:w-128" title="Login">
    <ElForm
      ref="registerForm"
      :model="form"
      :rules="validationRules"
      status-icon
      label-width="130px"
    >
      <ElFormItem ref="nameElItem" label="First/last name:">
        <ElRow justify="space-between">
          <ElCol :span="11">
            <ElFormItem prop="firstName">
              <ElInput
                v-model="form.firstName"
                type="text"
                placeholder="Firstname.."
              />
            </ElFormItem>
          </ElCol>
          <ElCol :span="11">
            <ElFormItem prop="lastName">
              <ElInput
                v-model="form.lastName"
                type="text"
                placeholder="Lastname.."
              />
            </ElFormItem>
          </ElCol>
        </ElRow>
      </ElFormItem>

      <ElFormItem label="Email:" prop="email">
        <ElInput
          v-model="form.email"
          type="email"
          placeholder="Enter your email.."
        />
      </ElFormItem>

      <ElFormItem label="Password:" prop="password">
        <ElInput
          v-model="form.password"
          type="password"
          placeholder="Enter a password.."
          show-password
        />
      </ElFormItem>

      <ElFormItem label="Be a coach:">
        <ElCheckbox ref="isCoach" v-model="form.isCoach" size="medium" />
      </ElFormItem>

      <div v-if="form.isCoach">
        <ElFormItem label="About you:" prop="description">
          <ElInput
            v-model="form.description"
            type="textarea"
            :rows="4"
            placeholder="Write a few words.."
          />
        </ElFormItem>

        <ElFormItem label="Hourly charge:">
          <ElInputNumber v-model="form.hourlyRate" min="0" />
          <span> $/hour</span>
        </ElFormItem>

        <ElFormItem label="Select skills:">
          <ElSelect v-model="form.skills" multiple class="w-full">
            <template v-for="skill of skillOptions" :key="skill">
              <ElOption :label="skill.skill" :value="skill.skill" />
            </template>
          </ElSelect>
        </ElFormItem>
      </div>

      <div class="flex justify-end">
        <ElButton type="primary" :disabled="formIsInvalid" @click="onSubmit">
          Register
        </ElButton>
      </div>
      <div class="p-2">
        <p class="text-center text-gray-400">
          Already have an account?
          <router-link to="/auth/login">
            <span class="text-blue-400 hover:underline"> Login! </span>
          </router-link>
        </p>
      </div>
    </ElForm>
  </BaseContainer>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue'
import {
  ICoachSkills,
  ICoachSkill,
  IUser,
  TNullableField,
  skillOptions
} from '@/types'
import { ElMessage } from 'element-plus'
import { authStore } from '@/store'
import { useRouter } from 'vue-router'
import { routeNames } from '@/router'

export default defineComponent({
  setup () {
    const router = useRouter()
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
    const isCoach = ref(null)
    const validateEmail = (
      _: unknown,
      value: string,
      callback: (error?: Error) => unknown
    ): void => {
      const regexp = /^(\w+((\.|-)\w+)?\.?)+@(gmail|ukr)\.(ua|com|org|net)$/
      if (regexp.test(value)) {
        callback()
      } else {
        callback(new Error('Enter correct email!'))
      }
    }
    const validatePassword = (
      _: unknown,
      value: string,
      callback: (error?: Error) => unknown
    ): void => {
      const regexp = /^(\w|\s){8,255}$/
      if (regexp.test(value)) {
        callback()
      } else {
        callback(new Error('Enter correct email!'))
      }
    }
    const validateDescription = (
      _: unknown,
      value: string,
      callback: (error?: Error) => unknown
    ) => {
      const regexp = /^.{30,255}$/
      if ((isCoach as any).isChecked) {
        if (regexp.test(value)) {
          callback()
        } else {
          callback(
            new Error('"About you" must be within 30 and 255 characters')
          )
        }
      } else {
        callback()
      }
    }

    const form = reactive({
      firstName: 'Pavlo',
      lastName: 'Hadzheha',
      email: 'business.pavlo2000@gmail.com',
      password: 'qwert12345',
      description:
        "I am a good coach. A great one I might say. And you'll see it immediately 'cause it's true",
      isCoach: false,
      hourlyRate: 0,
      skills: ['frontend'] as Array<keyof ICoachSkills>
    })

    const validationRules = {
      firstName: [
        {
          required: true,
          message: 'Please enter first name',
          trigger: 'blur'
        },
        {
          min: 2,
          max: 12,
          message: 'Length should be 2 to 12',
          trigger: 'blur'
        }
      ],
      lastName: [
        {
          required: true,
          message: 'Please enter last name',
          trigger: 'blur'
        },
        {
          min: 2,
          max: 12,
          message: 'Length should be 2 to 12',
          trigger: 'blur'
        }
      ],
      email: [
        {
          validator: validateEmail,
          trigger: 'blur'
        }
      ],
      password: [
        {
          validator: validatePassword,
          trigger: 'blur'
        }
      ],
      hourlyRate: [
        {
          required: true,
          message: 'This field is required',
          trigger: 'blur'
        },
        {
          min: 0,
          message: 'Min value is 0',
          trigger: 'blur'
        }
      ],
      description: [
        {
          validator: validateDescription,
          trigger: 'blur'
        }
      ]
    }

    const userData = computed<IUser>(() => {
      const {
        firstName,
        lastName,
        email,
        isCoach,
        description,
        hourlyRate,
        skills: skillsStr
      } = form
      const skills: ICoachSkill[] = skillOptions.filter((s) =>
        skillsStr.includes(s.skill)
      )
      const UID = ''
      return {
        UID,
        firstName,
        lastName,
        email,
        isCoach,
        coachData: !isCoach
          ? null
          : {
              description,
              hourlyRate,
              skills
            }
      }
    })

    const newUserUID = ref<TNullableField<string>>(null)

    const registerForm = ref(null)
    function onSubmit (): void {
      (registerForm.value as any).validate((valid: boolean) => {
        if (valid) {
          authStore
            .signUp({
              email: form.email,
              password: form.password,
              user: userData.value
            })
            .then(() => authStore.setActiveUser(newUserUID.value as string))
            .then(() => {
              showSuccess('Successfully signed up!')
              setTimeout(() => {
                router.push({ name: routeNames.coachesList })
              }, 1000)
            })
            .catch(() => {
              showError('Email is already in use. Try a different one')
            })
        }
      })
    }

    return {
      skillOptions,
      form,
      validationRules,
      onSubmit,
      isCoach,
      registerForm
    }
  }
})
</script>
<style scoped>
p {
  color: #606266;
}
</style>
