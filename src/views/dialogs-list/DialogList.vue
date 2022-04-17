<template>
  <template v-if="dialogs && dialogs?.length">
    <DialogItem
      v-for="dialog of dialogs"
      :key="dialog.recordID"
      :dialog="dialog"
      class="mb-4"
    />
  </template>
  <template v-else>
    <base-container>
      <h1>No dialogs yet</h1>
    </base-container>
  </template>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import DialogItem from './DialogItem.vue'
import { IDialog, TNullableField } from '@/types'
import { dialogStore } from '@/store'

export default defineComponent({
  components: { DialogItem },
  setup () {
    const dialogs = ref<TNullableField<IDialog[]>>(null)
    onMounted(async () => {
      dialogs.value = await dialogStore.setDialogs()
    })
    return {
      dialogs
    }
  }
})
</script>
