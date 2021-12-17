export interface IMessage {
  coachUID: string;
  userUID: string;
  recordID?: string;
  title: string;
  message: string;
  timestamp: string;
}

export interface MessageStore {
  messages: Array<IMessage>;
}
