import { IAuthOptions, IAuthStorageData, ISignInResponse, ISignUpResponse } from '@/types'
import { httpService } from '@/services/http'
import { firebaseService } from '@/core/utils/firebase.utils'

class AuthService {
    private timer!: number;
    public storageKey = 'userData';

    public signUp (options: IAuthOptions): Promise<ISignUpResponse> {
      const { email, password } = options
      return httpService.post(firebaseService.signUpURL, {
        email,
        password,
        returnSecureToken: true
      })
    }

    public async signIn (options: IAuthOptions): Promise<ISignInResponse | void> {
      const { email, password } = options
      try {
        return await httpService.post(firebaseService.signInURL, {
          email,
          password,
          returnSecureToken: true
        })
      } catch (err) {
        console.dir(err)
        return undefined
      }
    }

    public autoSignIn (): Promise<IAuthStorageData> {
      return new Promise((resolve, reject) => {
        if (localStorage.hasKey(this.storageKey)) {
          resolve(localStorage.getItem<IAuthStorageData>(this.storageKey) as IAuthStorageData)
        } else {
          reject(new Error('No userData stored'))
        }
      })
    }

    public signOut (): Promise<void> {
      return new Promise<void>((resolve) => {
        clearTimeout(this.timer)
        resolve()
      })
    }

    public calculateExpirationDate (seconds: number): number {
      const expiresIn = seconds * 1000
      return expiresIn + Date.now()
    }

    public setLogoutTimer (seconds: number): void {
      this.timer = setTimeout(() => clearTimeout(this.timer), seconds * 1000)
    }

    mapAuthResponse (response: ISignUpResponse | ISignInResponse): IAuthStorageData {
      return {
        token: response.idToken,
        expirationDate: this.calculateExpirationDate(Number(response.expiresIn)),
        userUID: response.localId
      }
    }
}

export const authService = new AuthService()
