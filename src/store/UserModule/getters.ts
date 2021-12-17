import {UserStore, IUser} from "@/data-structures/user"

export default {
  coaches(state: UserStore, _: any, __: any, rootGetters: any): Array<IUser> {
    return state.users.filter(u => {
      if(rootGetters['auth/userIsAuthenticated']) {
        return u.isCoach && rootGetters['auth/userID'] !== u.UID;
      } else {
        return u.isCoach;
      }
    });
  },
  hasCoaches(state: UserStore, getters: any): boolean {
    return getters.coaches && getters.coaches.length > 0;
  }
}
