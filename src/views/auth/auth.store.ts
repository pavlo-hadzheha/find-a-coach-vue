import { Action, Module, Mutation, VuexModule } from 'vuex-class-modules'
import {
  IAuthOptions,
  IAuthStorageData,
  IUser,
  ISignInResponse,
  ISignUpResponse,
  TNullableField
} from '@/types'
import { authService, userService } from '@/services'
import { store } from '@/store'
import { routeNames, router } from '@/router'

@Module({})
class AuthStore extends VuexModule {
  private _authData: TNullableField<IAuthStorageData> = null;
  private _activeUser: TNullableField<IUser> = null;
  public userIsAuthenticated = false;
  private timer: TNullableField<number> = null;

  get authData (): TNullableField<IAuthStorageData> {
    return Object.freeze(this._authData)
  }

  get userUID (): TNullableField<string> {
    return this._authData?.userUID ? this._authData?.userUID : null
  }

  get token (): TNullableField<string> {
    return this._authData?.token ? this._authData?.token : null
  }

  get activeUser (): TNullableField<IUser> {
    return this._activeUser ? this._activeUser : null
  }

  @Mutation
  SET_AUTH_DATA (data: IAuthStorageData): void {
    this._authData = data
  }

  @Mutation
  REMOVE_AUTH_DATA (): void {
    this._authData = null
  }

  @Mutation
  SIGN_IN (): void {
    this.userIsAuthenticated = true
  }

  @Mutation
  SET_TIMER (settings: { expirationDate: number; onend: () => void }): void {
    this.timer = setTimeout(() => {
      settings.onend()
      clearTimeout(this.timer as number)
    }, settings.expirationDate - Date.now())
  }

  @Mutation
  SET_ACTIVE_USER (user: IUser): void {
    this._activeUser = user
  }

  @Mutation
  REMOVE_ACTIVE_USER (): void {
    this._activeUser = null
  }

  @Mutation
  SIGN_OUT (): void {
    this.userIsAuthenticated = false
  }

  @Action
  private setAuthData (response: ISignInResponse | ISignUpResponse): void {
    const authData: IAuthStorageData = authService.mapAuthResponse(response)
    localStorage.setItem(authService.storageKey, authData)
    this.SET_AUTH_DATA(authData)
  }

  @Action
  private removeAuthData (): void {
    localStorage.removeItem(authService.storageKey)
    this.REMOVE_AUTH_DATA()
  }

  @Action
  async setActiveUser (userUID: string): Promise<IUser> {
    const user = await userService.getOne(userUID)
    this.SET_ACTIVE_USER(user)
    return user
  }

  @Action
  async signIn (options: IAuthOptions): Promise<IAuthStorageData> {
    const response: ISignInResponse = (await authService.signIn(
      options
    )) as ISignInResponse
    this.SIGN_IN()
    this.setAuthData(response)
    this.SET_TIMER({
      expirationDate: (this.authData as IAuthStorageData).expirationDate,
      onend: () => {
        this.SIGN_OUT()
        this.REMOVE_ACTIVE_USER()
        this.REMOVE_AUTH_DATA()
      }
    })
    this.SIGN_IN()
    return this.authData as IAuthStorageData
  }

  @Action
  async autoSignIn (): Promise<IUser> {
    return await authService
      .autoSignIn()
      .then((data) => {
        this.SET_AUTH_DATA(data)
        this.SIGN_IN()
        this.SET_TIMER({
          expirationDate: (this.authData as IAuthStorageData).expirationDate,
          onend: () => {
            this.SIGN_OUT()
            this.REMOVE_ACTIVE_USER()
            this.REMOVE_AUTH_DATA()
          }
        })
      })
      .then(() => {
        return this.setActiveUser(this.userUID as string)
      })
  }

  @Action
  async signUp (options: IAuthOptions): Promise<IAuthStorageData> {
    if (!options.user) throw new ReferenceError('No IUser provided in sign up')
    const signUpResponse: ISignUpResponse = await authService.signUp(options)
    this.setAuthData(signUpResponse)
    const user = {
      ...options.user,
      UID: signUpResponse.localId
    }
    await userService.create(user, this.token as string)
    this.SIGN_IN()
    this.SET_TIMER({
      expirationDate: (this.authData as IAuthStorageData).expirationDate,
      onend: () => {
        this.SIGN_OUT()
        this.REMOVE_ACTIVE_USER()
        this.REMOVE_AUTH_DATA()
      }
    })
    return this.authData as IAuthStorageData
  }

  @Action
  async signOut (): Promise<void> {
    await router.push({ name: routeNames.coachesList })
    this.REMOVE_AUTH_DATA()
    this.SIGN_OUT()
    this.REMOVE_ACTIVE_USER()
    localStorage.removeItem(authService.storageKey)
  }
}

export const authStore = new AuthStore({
  name: 'AuthStore',
  store
})
