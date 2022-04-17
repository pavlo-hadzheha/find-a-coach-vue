import { VuexModule, Mutation, Action, Module } from 'vuex-class-modules'
import { IDialog } from '@/types'
import { dialogService } from '@/services'
import { authStore, store } from '@/store'

@Module
class DialogStore extends VuexModule {
  private _dialogs: IDialog[] = [];

  get dialogs (): IDialog[] {
    return this._dialogs
  }

  get hasDialogs (): boolean {
    return this.dialogs.length > 0
  }

  @Mutation
  SET_DIALOGS (dialogs: IDialog[]): void {
    this._dialogs = dialogs
  }

  @Action
  async setDialogs (): Promise<IDialog[]> {
    const activeUser = authStore.activeUser
    if (activeUser && activeUser.dialogs) {
      const ids = activeUser.dialogs.map((d) => d.dialogUID)
      const dialogs = await dialogService.getAll(
        ids,
        authStore.token as string
      )
      this.SET_DIALOGS(dialogs)
      return dialogs
    } else {
      return []
    }
  }
}

export const dialogStore = new DialogStore({
  name: 'DialogStore',
  store
})
