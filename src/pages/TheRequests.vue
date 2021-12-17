<template>
  <base-container id="dialogs" title="Dialogs">
    <DialogList :dialogs="dialogs" @click="showDialogs" />
  </base-container>
</template>

<script lang="ts">
import { ElLoading } from 'element-plus'
import { defineComponent } from 'vue'
import { mapActions, mapGetters } from 'vuex'
import DialogList from '@/components/requests/DialogList.vue';

export default defineComponent({
  components: { DialogList },
  methods: {
    ... mapActions({getMessages: 'messages/getMessages'}),
    showDialogs(): void {
      console.log(this.dialogs)
    }
  },
  computed: {
    ... mapGetters({dialogs: 'messages/dialogs'})
  },
  async mounted(): Promise<void> {
    const loadingInstance = ElLoading.service({target: '#dialogs'});
    await this.getMessages()
    loadingInstance.close();
  },
})
</script>

