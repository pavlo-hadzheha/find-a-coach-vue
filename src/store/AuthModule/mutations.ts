import {AuthStore} from "@/data-structures/auth";
import {IUser} from "@/data-structures/user";
import ls from "@/utils/localStorage";

export default {
  authenticate(state: AuthStore, payload: any): void {
    state.token = payload.token;
    state.userUID = payload.userUID;
    state.expirationDate = payload.expirationDate;
  },
  setUser(state: AuthStore, user: IUser): void {
    state.activeUser = user;
  },
  login(state: AuthStore): void {
    state.userIsAuthenticated = true;
  },
  logout(state: AuthStore): void {
    state.userIsAuthenticated = false;
    state.token = '';
    state.userUID = '';
    state.expirationDate = '';
    ls.rm('userData');
  }
}
