<template>
  <el-checkbox-group v-model="chosen" @change="activate">
      <el-checkbox-button 
        v-for="skill of skillOptions" 
        :key="skill.skill" :label="skill.skill">
        {{skill.skill}}
      </el-checkbox-button>
    </el-checkbox-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { skillOptions } from '@/data-structures/user';

export default defineComponent({
  props: ['modelValue'],
  emits: ['update:modelValue'],
  data() {
    return {
      chosen: [],
      skillOptions
    }
  },
  methods: {
    activate(): void {
      this.$emit('update:modelValue', this.chosen);
    }
  }
})
</script>

