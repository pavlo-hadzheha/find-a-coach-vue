import { IUser } from '@/types'

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

export interface IDialogMeta {
    dialogUID: string;
    receiverUID: string;
}

export interface ISendMessageOptions {
    from: IUser;
    to: IUser;
    message: IMessage;
    token: string;
}
