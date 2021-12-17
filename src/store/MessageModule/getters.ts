import {IMessage, MessageStore} from "@/data-structures/request";

function groupBy<T>(arr: T[], key: keyof T): T[][] {
  const uniqueValues = new Set(arr.map(e => e[key]));
  const out: T[][] = [];
  uniqueValues.forEach(value => {
    out.push(arr.filter(e => e[key] === value))
  })
  return out;
}

export default {
  messages(state: MessageStore): IMessage[] {
    return state.messages;
  },
  dialogs(state: MessageStore): IMessage[][] {
    return groupBy(state.messages, 'coachUID');
  }
}
