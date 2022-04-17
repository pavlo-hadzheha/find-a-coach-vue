import { IDialogMeta, IDialog, IUser, ISendMessageOptions } from '@/types'
import { httpService, userService } from '@/services'
import { firebaseService } from '@/core/utils/firebase.utils'

class DialogService {
  async getAll (ids: string[], token: string): Promise<IDialog[]> {
    const out: IDialog[] = []
    const config = { params: { auth: token } }
    for (const id of ids) {
      const dialog = await httpService.get<IDialog>(
        firebaseService.dialogsURL(id),
        config
      )
      if (dialog) {
        dialog.recordID = id
        out.push(dialog)
      }
    }
    return out
  }

  async getOne (id: string, token: string): Promise<IDialog> {
    const config = { params: { auth: token } }
    return httpService.get<IDialog>(firebaseService.dialogsURL(id), config)
  }

  async sendMessage (options: ISendMessageOptions): Promise<IDialog> {
    const { from, to, message, token } = options
    const config = { params: { auth: token } }
    if (this.dialogExists(from, to)) {
      console.error('dialogExists')
      const dialogUID = this.getUID(from, to)
      const dialog = await this.getOne(dialogUID, token)
      dialog.messages.push(message)
      const updateUrl = firebaseService.dialogsURL(`${dialogUID}/messages`)
      await httpService.put(updateUrl, dialog.messages, config)
      return dialog
    } else {
      console.error('dialog [NOT] Exists')
      const newDialog: IDialog = {
        user1: from,
        user2: to,
        messages: [message]
      }
      const { name: newDialogUID } = await httpService.post(
        firebaseService.dialogsURL(),
        newDialog,
        config
      )
      await this.updateUserDialogs(from, to, newDialogUID, token)
      await this.updateUserDialogs(to, from, newDialogUID, token)
      return newDialog
    }
  }

  private dialogExists (from: IUser, to: IUser) {
    return from.dialogs &&
        to.dialogs &&
        from.dialogs.some((d) => d.receiverUID === to.UID) &&
        to.dialogs.some((d) => d.receiverUID === from.UID)
  }

  private async updateUserDialogs (
    from: IUser,
    to: IUser,
    dialogUID: string,
    token: string
  ): Promise<void> {
    const dialogRecord: IDialogMeta = {
      receiverUID: to.UID,
      dialogUID: dialogUID
    }
    if (from.dialogs) {
      from.dialogs.push(dialogRecord)
    } else {
      from.dialogs = [dialogRecord]
    }
    await userService.update(from, token)
  }

  private getUID (from: IUser, to: IUser): string {
    return from.dialogs?.find((d) => d.receiverUID === to.UID)
      ?.dialogUID as string
  }
}

export const dialogService = new DialogService()
