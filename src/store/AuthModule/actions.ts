import { IUser, UserStore} from '@/data-structures/user';
import { Commit, ActionContext } from 'vuex';
import axios, {AxiosResponse} from 'axios';
import fb from '@/firebase';
import ls from "@/utils/localStorage";
import {AuthStore} from '@/data-structures/auth';
import router from '../../router';

let timer: number;

export default {
  async register(ctx: ActionContext<AuthStore, any>, payload:  { user: IUser, email: string, password: string}): Promise<void> {
    const { user: userRequest, email, password } = payload;
    let response: AxiosResponse<any, any>;
    try {
      response = await axios.post(fb.API.auth.signUp, {
        email,
        password,
        returnSecureToken: true
      });
    } catch(err) {
      throw new Error('This email has already been used');
    }
    if(response.statusText === 'OK' || response.status === 200) {
      userRequest.UID = response.data.localId;
      try {
        await axios.post(fb.API.users(), userRequest, {
          params: {
            auth: response.data.idToken
          }
        });
        const expiresIn = +response.data.expiresIn * 1000;
        const expirationDate = expiresIn + Date.now();
        const userData = {
          token: response.data.idToken,
          userUID: response.data.localId,
          expirationDate: expirationDate
        };
        setTimeout(() => {
          ctx.dispatch('logout');
        }, expiresIn);
        ls.set('userData', userData);
        ctx.commit('login');
        ctx.commit('authenticate', userData);
        const user = await ctx.dispatch('users/getUser',{}, {root: true});
        ctx.dispatch('setActiveUser', user);
      } catch(err) {
        throw new Error('Unauthorized action. Need a token');
      }
    } else {
      throw new Error('Something went wrong. Try again later');
    }
  },
  async login(ctx: ActionContext<AuthStore, any>, payload: {email: string, password: string}): Promise<void> {
    const { email, password } = payload;
    let response: AxiosResponse<any, any>;
    try {
      response = await axios.post(fb.API.auth.signIn, {
        email,
        password,
        returnSecureToken: true
      });
    } catch(err) {
      throw new Error('Wrong email or password');
    }
    if(response.statusText === 'OK' || response.status === 200) {
      const expiresIn = +response.data.expiresIn * 1000;
      const expirationDate = expiresIn + Date.now();
      const userData = {
        token: response.data.idToken,
        userUID: response.data.localId,
        expirationDate: expirationDate
      };
      setTimeout(() => {
        ctx.dispatch('logout');
      }, expiresIn);
      ls.set('userData', userData);
      ctx.commit('authenticate', userData);
      ctx.commit('login');
      const user = await ctx.dispatch('users/getUser',{}, {root: true});
      ctx.dispatch('setActiveUser', user);
    } else {
      throw new Error('Something went wrong. Try again later');
    }
  },
  logout({commit}: {commit: Commit}): void {
    clearTimeout(timer);
    commit('logout');
    router.push('/coaches');
  },
  setActiveUser(ctx: ActionContext<AuthStore, any>, user: IUser): void {
    ctx.commit('setUser', user);
  },
  async autoLogin(ctx: ActionContext<AuthStore, UserStore>): Promise<void> {
    const userData = ls.get<AuthStore>('userData') as AuthStore;
    if(userData) {
      const expirationDate = +userData.expirationDate;
      const diff = expirationDate - Date.now();
      if(diff > 0) {
        ctx.commit('login');
        ctx.commit('authenticate', userData);
        const user = await ctx.dispatch('users/getUser',{}, {root: true});
        ctx.dispatch('setActiveUser', user);
      } else {
        ctx.dispatch('logout');
      }
    }
  }
}
