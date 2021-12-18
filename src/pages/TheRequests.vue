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
import DialogList from '@/components/requests/DialogList.vue';
import { IDialog } from '@/data-structures/request';

export default defineComponent({
  components: { DialogList },
  data() {
    return {
      dialogs: null as null | IDialog[]
    }
  },
  methods: {
    ... mapActions({getDialogs: 'messages/getDialogs'}),
    showDialogs(): void {
      console.log(this.dialogs)
    }
  },
  
  async mounted(): Promise<void> {
    const loadingInstance = ElLoading.service({target: '#dialogs'});
    this.dialogs = await this.getDialogs()
    console.log('dialogs received', this.dialogs);
    loadingInstance.close();
  },
})
</script>

