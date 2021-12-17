import actions from './actions';
import mutations from './mutations';
import getters from './getters';
import {AuthStore} from '@/data-structures/auth';
import {RootStore} from '@/data-structures/store-state.inteface';
import {Module} from 'vuex';

export default {
  namespaced: true,
  state(): AuthStore {
    return {
      token: '',
      userUID: '',
      expirationDate: '',
      userIsAuthenticated: false,
      activeUser: null
    }
  },
  mutations: mutations,
  actions: actions,
  getters: getters
}
