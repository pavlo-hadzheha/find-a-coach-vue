import { IUser } from '@/types'
import { httpService } from '@/services/http'
import { firebaseService } from '@/core/utils/firebase.utils'
import { turnArray } from '@/core/utils'

class UserService {
  public async getOne (userUID: string): Promise<IUser> {
    const users = await this.getAll()
    return users.find((u) => u.UID === userUID) as IUser
  }

  public async getAll (): Promise<IUser[]> {
    const response = await httpService.get<any>(firebaseService.usersURL())
    const transformed = turnArray<IUser>(response, 'recordID')
    return transformed
  }

  public async create (user: IUser, token: string): Promise<string> {
    return httpService.post(firebaseService.usersURL(user.recordID), user, {
      params: {
        auth: token
      }
    })
  }

  public async update (user: IUser, token: string): Promise<void> {
    return httpService.patch(firebaseService.usersURL(user.recordID), user, {
      params: {
        auth: token
      }
    })
  }
}

export const userService = new UserService()
