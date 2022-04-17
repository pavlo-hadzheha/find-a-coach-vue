import { VuexModule, Mutation, Action, Module } from 'vuex-class-modules'
import { IUser, TNullableField } from '@/types'
import { authStore, store } from '@/store'
import { userService } from '@/services'

@Module
class UserStore extends VuexModule {
  private _users: TNullableField<IUser[]> = null;

  get coaches (): IUser[] {
    if (this._users) {
      if (authStore.userIsAuthenticated) {
        return this._users?.filter(
          (u) => u.isCoach && u.UID !== authStore.userUID
        )
      } else {
        return this._users.filter((u) => u.isCoach)
      }
    } else {
      return []
    }
  }

  get hasCoaches (): boolean {
    return this.coaches && this.coaches.length > 0
  }

  @Mutation
  SET_USERS (users: IUser[]): void {
    this._users = users
  }

  @Action
  async setUsers (): Promise<void> {
    const users = await userService.getAll()
    this.SET_USERS(users)
  }
}

export const userStore = new UserStore({
  name: 'UserStore',
  store
})
