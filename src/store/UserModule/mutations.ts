import {IUser, UserStore} from "@/data-structures/user";

export default {
  set(state: UserStore, users: Array<IUser>): void {
    state.users = users ;
  },
}
