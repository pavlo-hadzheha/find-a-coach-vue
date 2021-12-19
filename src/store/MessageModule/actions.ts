import {IDialog, IMessage, MessageStore} from "@/data-structures/request";
import {IUser} from "@/data-structures/user";
import fb from "@/firebase";
import {toArray} from "@/utils/dataWrangle";
import axios, { AxiosResponse } from "axios";
import {ActionContext} from "vuex";

export default {
  async getDialogs(ctx: ActionContext<MessageStore, any>): Promise<IDialog[] | void> {
    if(ctx.rootState.auth.userIsAuthenticated) {
      try {
        const { token, activeUser } = ctx.rootState.auth;
        const dialogUIDs = (activeUser as IUser)?.dialogs?.map(d => d.dialogUID);
        const dialogs: IDialog[] = [];
        if(dialogUIDs) {
          for(const dialogUID of dialogUIDs) {
            const dialog: IDialog = await ctx.dispatch('getDialog', dialogUID);
            dialogs.push(dialog);
          }
          ctx.commit('set', dialogs);
          dialogs.sort((a, b) => {
            const timestampsA: number[] = a.messages.map(m => +m.timestamp);
            const timestampsB: number[] = b.messages.map(m => +m.timestamp);
            const latestA = Math.max(...timestampsA);
            const latestB = Math.max(...timestampsB);
            if(latestA > latestB) {
              return 1;
            } else {
              return -1;
            }
          });
          return dialogs;
        }
      } catch(err) {
        throw new Error( 'Could get the messages list');
      }
    }
  },
  async getDialog(ctx: ActionContext<MessageStore, any>, dialogUID: string): Promise<IDialog | void> {
    if(ctx.rootState.auth.userIsAuthenticated) {
      try {
        const { token } = ctx.rootState.auth;
        const response = await axios.get<IDialog>(fb.API.dialogs(dialogUID), {params: {auth: token}});
        const dialog = response.data;
        dialog.recordID = dialogUID;
        dialog.messages.sort((a, b) => +b.timestamp - +a.timestamp);
        return response.data;
      } catch(err) {
        throw new Error( `Could get the dialog (${dialogUID})`);
      }
    }
  },
  async sendMessage(ctx: ActionContext<MessageStore, any>, payload: {message: IMessage, from: IUser, to: IUser}): Promise<void> {
    if(ctx.rootState.auth.userIsAuthenticated) {
      try {
        const token = ctx.rootState.auth.token;
        const dialogExists = payload.from.dialogs && payload.from.dialogs.some(d => d.receiverUID === payload.to.UID);
        if(dialogExists) {
          const dialogUID = payload.from.dialogs?.find(d => d.receiverUID === payload.to.UID)?.dialogUID;
          const dialog = await ctx.dispatch('getDialog', dialogUID);
          dialog.messages.push(payload.message);
          const url = fb.API.dialogs(`${dialogUID}/messages`);
          try {
            await axios.put(url, dialog.messages, {params: {auth: token}});
          } catch(err) {
            throw new Error('Could not send the message');
          }
        } else {
          const newDialog: IDialog = {
            user1: payload.from,
            user2: payload.to,
            messages: [payload.message]
          };
          const response = await axios.post(fb.API.dialogs(), newDialog, {params: {auth: token}});
          const dialogUID = response.data.name;
          const updatedFrom = payload.from;
          const updatedTo = payload.to;
          if(updatedTo.dialogs) {
            updatedTo.dialogs.push({
              receiverUID: updatedFrom.UID,
              dialogUID: dialogUID
            });
          } else {
            updatedTo.dialogs = [{
              receiverUID: updatedFrom.UID,
              dialogUID: dialogUID
            }];
          }
          if(updatedFrom.dialogs) {
            updatedFrom.dialogs.push({
              receiverUID: updatedTo.UID,
              dialogUID: dialogUID
            });
          } else {
            updatedFrom.dialogs = [{
              receiverUID: updatedTo.UID,
              dialogUID: dialogUID
            }];
          }
          await ctx.dispatch('users/updateUser', updatedTo, {root: true});
          await ctx.dispatch('users/updateUser', updatedFrom, {root: true});
        }
      } catch(err) {
        throw new Error( 'Could send the message. Try later');
      }
    }
  }
}
