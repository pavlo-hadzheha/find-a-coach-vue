import {IDialog, IMessage, MessageStore} from "@/data-structures/dialog";

function groupBy<T>(arr: T[], key: keyof T): T[][] {
  const uniqueValues = new Set(arr.map(e => e[key]));
  const out: T[][] = [];
  uniqueValues.forEach(value => {
    out.push(arr.filter(e => e[key] === value))
  })
  return out;
}

export default {
  dialogs(state: MessageStore): IDialog[] {
    return state.dialogs;
  },
}
