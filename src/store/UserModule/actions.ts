import { IUser, UserStore } from '@/data-structures/user';
import { ActionContext, Commit } from 'vuex';
import axios from 'axios';
import fb from '@/firebase';
import {toArray} from '@/utils/dataWrangle';

export default {
  async set({commit}: {commit: Commit}): Promise<void> {
    try {
      await axios.get<IUser[]>(fb.API.users()).then(response => {
        if(response.data) {
          commit('set', toArray(response.data, 'recordID'));
        }  
      })
    } catch(err) {
      throw new Error('Could not get the data');
    }
  },
  async getUser(ctx: ActionContext<UserStore, any>, userUID: string): Promise<IUser | null> {
    await ctx.dispatch('set');
    const users = ctx.rootGetters['users/users'] as IUser[];
    const chosen = users.find(user => user.UID === userUID) as IUser;
    if(chosen) {
      return chosen;
    } else {
      return null
    }
  },
  async updateUser(ctx: ActionContext<UserStore, any>, user: IUser): Promise<void> {
    try {
      const token = ctx.rootState.auth.token;
      const query = {
        auth: token
      };
      const response = await axios.patch(fb.API.users(user.recordID), user, {params: query});
      if(response.statusText === 'OK' && response.status === 200) {
        ctx.dispatch('auth/setActiveUser', user, {root: true});
      } else {
        throw new Error('Could not update your data')
      }
    } catch(err) {
      throw new Error('Could not update your data')
    }
  }
};
