import {IMessage, MessageStore} from "@/data-structures/request";

export default {
  set(state: MessageStore, messages: IMessage[]): void {
    state.messages = messages;
  }
}

