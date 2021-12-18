import {IDialog, MessageStore} from "@/data-structures/request";

export default {
  set(state: MessageStore, dialogs: IDialog[]): void {
    state.dialogs = dialogs;
  }
}

