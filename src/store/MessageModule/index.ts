import { IDialog, IMessage, MessageStore } from '@/data-structures/dialog';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
  namespaced: true,
  state(): MessageStore {
    return {
      dialogs: [] as IDialog[]
    }
  },
  actions,
  mutations,
  getters
}
