import {AuthStore} from "./auth";
import {MessageStore} from "./request";
import {UserStore} from "./user";

export interface RootStore {
  messages: MessageStore;
  users: UserStore;
  auth: AuthStore;
}
