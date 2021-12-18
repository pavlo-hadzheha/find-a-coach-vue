import {IUser} from "../user";

export interface IMessage {
  senderUID: string;
  receiverUID: string;
  recordID?: string;
  title: string;
  message: string;
  timestamp: string;
}

export interface IDialog {
  recordID?: string;
  user1: IUser;
  user2: IUser;
  messages: IMessage[]
}

export interface DialogMeta {
  dialogUID: string;
  receiverUID: string;
}

export interface MessageStore {
  dialogs: Array<IDialog>;
}
