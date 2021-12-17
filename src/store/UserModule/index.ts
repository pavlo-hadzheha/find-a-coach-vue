import actions from './actions';
import mutations from './mutations';
import getters from './getters';
import { 
  IUser,
  UserStore,
} from '@/data-structures/user';

export default {
  namespaced: true,
  state(): UserStore {
    return {
      users: [] as Array<IUser>
    }
  },
  mutations,
  actions,
  getters
}
