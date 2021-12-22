<template>
  <base-container id="dialogs" title="Dialogs">
    <DialogList :dialogs="dialogs" @click="showDialogs"  v-if="dialogs && dialogs.length"/>
    <p class="font-bold text-center text-2xl" v-else>No Dialogs yet</p>
  </base-container>
</template>

<script lang="ts">
import { ElLoading } from 'element-plus'
import { defineComponent } from 'vue'
import { mapActions, mapGetters } from 'vuex'
import DialogList from '@/components/dialogs/DialogList.vue';
import { IDialog } from '@/data-structures/dialog';

export default defineComponent({
  components: { DialogList },
  data() {
    return {
      dialogs: null as null | IDialog[]
    }
  },
  methods: {
    ... mapActions({getDialogs: 'messages/getDialogs'}),
  },

  async mounted(): Promise<void> {
    const loadingInstance = ElLoading.service({target: '#dialogs'});
    this.dialogs = await this.getDialogs()
    loadingInstance.close();
  },
})
</script>

