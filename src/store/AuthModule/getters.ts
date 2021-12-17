import {AuthStore} from "@/data-structures/auth";
import {IUser} from "@/data-structures/user";

export default { 
  userID(state: AuthStore): string {
    return state.userUID;
  },
  token(state: AuthStore): string {
    return state.token;
  },
  userIsAuthenticated(state: AuthStore): boolean {
    return state.userIsAuthenticated;
  },
  activeUser(state: AuthStore): IUser {
    return state.activeUser as IUser;
  }
}
