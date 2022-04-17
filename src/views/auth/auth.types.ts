import { IUser } from '@/types'

export interface IAuthStore {
    token: string;
    userUID: string;
    expirationDate: string;
    userIsAuthenticated: boolean;
    activeUser: IUser | null;
}
export interface IAuthOptions {
    user?: IUser;
    email: string;
    password: string;
}

export interface ISignUpResponse {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered: boolean;
}

export interface ISignInResponse {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered: boolean;
}

export interface IAuthStorageData {
    token: string;
    userUID: string;
    expirationDate: number;
}
