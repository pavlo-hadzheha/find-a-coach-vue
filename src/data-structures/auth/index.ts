import {IUser} from "../user";

export interface AuthStore {
  token: string;
  userUID: string;
  expirationDate: string;
  userIsAuthenticated: boolean;
  activeUser: IUser | null;
}
