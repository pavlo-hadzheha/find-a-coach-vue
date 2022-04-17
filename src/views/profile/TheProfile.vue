<template>
  <base-container v-if="activeUser" class="mb-6" title="Profile">
    <div class="flex justify-between">
      <h4 class="text-2xl font-bold text-blue-500">
        {{ name }}
        <span v-if="activeUser?.isCoach">
          (${{ activeUser?.coachData.hourlyRate }}/hour)
        </span>
      </h4>
      <ElButton v-if="!editMode" type="warning" @click="openEdit">Edit</ElButton>
      <ElButton v-else type="danger" @click="closeEdit">Close</ElButton>
    </div>
    <div class="mb-2">
      <p class="italic font-bold">{{ activeUser?.email }}</p>
      <div v-if="activeUser?.isCoach" class="flex mt-2 gap-1">
        <ElTag
          v-for="skill of activeUser?.coachData.skills"
          :key="skill"
          :type="skill.tagType"
        >
          {{ skill.skill }}
        </ElTag>
      </div>
    </div>
    <p class="text-xs text-gray-400">
      Click <i class="text-yellow-400">Edit</i> to add coach data and start
      earning money!
    </p>
  </base-container>
  <base-container v-if="editMode" id="editFormContainer" class="mb-24">
    <ElForm
      ref="formRef"
      :rules="rules"
      :model="form"
      status-icon
      label-width="110px"
    >
      <ElFormItem ref="elem" label="First/last name:">
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

      <ElFormItem label="Be a coach:">
        <label class="text-xs text-gray-400">
          <ElCheckbox
            ref="isCoach"
            v-model="form.isCoach"
            size="medium"
          />
          (checking this will
          <i class="text-red-500">remove</i>
          /
          <i class="text-green-500">add</i> you from/to the list of
          coaches)</label>
      </ElFormItem>

      <div v-if="form.isCoach">
        <ElFormItem label="About you:" prop="description">
          <ElInput
            ref="isCoach"
            v-model="form.description"
            type="textarea"
            :rows="4"
            placeholder="Write a few words.."
          />
        </ElFormItem>

        <ElFormItem label="Hourly charge:">
          <ElInputNumber
            v-model.number="form.hourlyRate"
            min="0"
          />
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
        <ElButton type="danger" @click="closeEdit">Close</ElButton>
        <ElButton type="success" @click="saveChanges">Save Changes</ElButton>
      </div>
    </ElForm>
  </base-container>
</template>

<script lang="ts">
import { ICoachSkill, IUser, skillOptions } from '@/types/user'
import { computed, defineComponent, onMounted, reactive, ref } from 'vue'
import { authStore } from '@/store'
import { userService } from '@/services'
import { ElLoading, ElMessage } from 'element-plus'

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

export default defineComponent({
  setup () {
    const isCoach = ref(null)
    const editMode = ref(false)
    const activeUser = computed<IUser | null>(() => authStore.activeUser)
    const formRef = ref(null)
    const name = computed(
      () => activeUser.value?.firstName + ' ' + activeUser.value?.lastName
    )

    const form = reactive({
      firstName: '',
      lastName: '',
      isCoach: false,
      description: '',
      skills: [] as string[],
      hourlyRate: 0
    })

    const validateDescription = (
      _: unknown,
      value: string,
      callback: (error?: Error) => unknown
    ) => {
      const regexp = /^.{30,255}$/
      if ((isCoach.value as any).isChecked) {
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
    const rules = {
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

    function openEdit (): void {
      editMode.value = true
    }

    function closeEdit (): void {
      editMode.value = false
    }

    function initForm (): void {
      if (activeUser.value) {
        form.firstName = activeUser.value?.firstName
        form.lastName = activeUser.value?.lastName
        form.isCoach = activeUser.value?.isCoach
        if (activeUser.value?.isCoach && activeUser.value?.coachData) {
          form.description = activeUser.value?.coachData.description
          form.skills = activeUser.value?.coachData?.skills?.map(
            (s) => s.skill
          )
          form.hourlyRate = activeUser.value?.coachData.hourlyRate
        }
      }
    }

    function patchedUser (): IUser | null {
      if (activeUser.value) {
        const skills: ICoachSkill[] = skillOptions.filter((s) =>
          form.skills.includes(s.skill)
        )
        return {
          ...(activeUser.value as IUser),
          firstName: form.firstName,
          lastName: form.lastName,
          isCoach: form.isCoach,
          coachData: !form.isCoach
            ? null
            : {
                description: form.description,
                skills: skills,
                hourlyRate: form.hourlyRate
              }
        }
      }
      return null
    }
    onMounted(initForm)

    function saveChanges (): void {
      const form = formRef.value as any
      form.validate(async (valid: boolean) => {
        if (valid) {
          const loadingInstance = ElLoading.service({
            target: '#editFormContainer'
          })
          try {
            await userService.update(
              patchedUser() as IUser,
              authStore.token as string
            )
            editMode.value = false
            showSuccess('Successfully updated data!')
            await authStore.setActiveUser(authStore.userUID as string)
          } catch (err: any) {
            showError(err.message)
          } finally {
            loadingInstance.close()
          }
        }
      })
    }

    return {
      skillOptions,
      isCoach,
      rules,
      form,
      editMode,
      formRef,
      openEdit,
      closeEdit,
      activeUser,
      name,
      saveChanges
    }
  }
})
</script>
