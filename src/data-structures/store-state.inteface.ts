import {AuthStore} from "./auth";
import {MessageStore} from "./dialog";
import {UserStore} from "./user";

export interface RootStore {
  messages: MessageStore;
  users: UserStore;
  auth: AuthStore;
}
