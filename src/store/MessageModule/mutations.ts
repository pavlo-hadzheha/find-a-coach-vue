import {IDialog, MessageStore} from "@/data-structures/dialog";

export default {
  set(state: MessageStore, dialogs: IDialog[]): void {
    state.dialogs = dialogs;
  }
}

