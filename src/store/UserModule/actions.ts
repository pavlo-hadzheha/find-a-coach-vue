import { IUser, UserStore } from '@/data-structures/user';
import { ActionContext, Commit } from 'vuex';
import axios from 'axios';
import fb from '@/firebase';
import {toArray} from '@/utils/dataWrangle';

export default {
  async set({commit}: {commit: Commit}): Promise<void> {
    try {
      await axios.get<IUser[]>(fb.API.users(), {
        params: {
          isCoach: true
        }
      }).then(response => {
        if(response.data) {
          commit('set', toArray(response.data, 'recordID'));
        }  
      })
    } catch(err) {
      throw new Error('Could not get the data');
    }
  },
  async getUser(ctx: ActionContext<UserStore, any>, userUID: string): Promise<IUser | never> {
    try {
      const response = await axios.get<IUser[]>(fb.API.users(), {params: { UID: userUID }});
      if(response.statusText === 'OK' && response.status === 200) {
        const user = toArray(response.data, 'recordID')[0] as IUser;
        return user;
      } else {
        throw new Error('Could not get your data. Try later')
      }
    } catch {
      throw new Error('Could not get your data. Try later')
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
