import { IMessage, MessageStore } from '@/data-structures/request';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
  namespaced: true,
  state(): MessageStore {
    return {
      messages: [] as IMessage[]
    }
  },
  actions,
  mutations,
  getters
}
