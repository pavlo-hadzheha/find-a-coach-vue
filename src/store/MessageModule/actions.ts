import {IMessage, MessageStore} from "@/data-structures/request";
import fb from "@/firebase";
import {toArray} from "@/utils/dataWrangle";
import axios from "axios";
import {ActionContext} from "vuex";

export default {
  async getMessages(ctx: ActionContext<MessageStore, any>): Promise<void> {
    if(ctx.rootState.auth.userIsAuthenticated) {
      try {
        const { token, userUID } = ctx.rootState.auth;
        const query = {
          auth: token,
          userUID: userUID,
        };
        const response = await axios.get<IMessage[]>(fb.API.messages(), {params: query});
        console.log(response)
        ctx.commit('set', toArray(response.data, 'recordID'));
      } catch(err) {
        console.dir(err);
        throw new Error( 'Could get the messages list');
      }
    }
  },
  async sendMessage(ctx: ActionContext<MessageStore, any>, message: IMessage): Promise<void> {
    if(ctx.rootState.auth.userIsAuthenticated) {
      try {
        const token = ctx.rootState.auth.token;
        await axios.post(fb.API.messages(), message, {params: {auth: token}});
        await ctx.dispatch('getMessages');
        console.log('messages =>', ctx.getters)
      } catch(err) {
        console.dir(err);
        throw new Error( 'Could send the message. Try later');
      }
    }
  }
}
