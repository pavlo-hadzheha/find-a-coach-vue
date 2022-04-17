class FirebaseService {
    private config = {
      apiKey: 'AIzaSyAFeAnAqKYZXPUc_IG2OP2I8Dt3nou8F6w',
      authDomain: 'vue-course-346d6.firebaseapp.com',
      databaseURL: 'https://vue-course-346d6-default-rtdb.europe-west1.firebasedatabase.app',
      signInURL: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword',
      signUpURL: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp',
      projectId: 'vue-course-346d6',
      storageBucket: 'vue-course-346d6.appspot.com',
      messagingSenderId: '542227284121',
      appId: '1:542227284121:web:7060a2a4058b1d51687808'
    };

    static normalizedPath (path?: string): string {
      if (!path) return ''
      path = path.trim()
      path = path.endsWith('/') ? path.slice(0, -1) : path
      path = path.startsWith('/') ? path.slice(1) : path
      return path
    }

    usersURL (path?: string): string {
      const url = `${this.config.databaseURL}/users`
      return `${url}${path ? '/' : ''}${FirebaseService.normalizedPath(path)}.json`
    }

    messagesURL (path?: string): string {
      const url = `${this.config.databaseURL}/messages`
      return `${url}${path ? '/' : ''}${FirebaseService.normalizedPath(path)}.json`
    }

    dialogsURL (path?: string): string {
      const url = `${this.config.databaseURL}/dialogs`
      return `${url}${path ? '/' : ''}${FirebaseService.normalizedPath(path)}.json`
    }

    get signInURL (): string {
      return `${this.config.signInURL}?key=${this.config.apiKey}`
    }

    get signUpURL (): string {
      return `${this.config.signUpURL}?key=${this.config.apiKey}`
    }
}

export const firebaseService = new FirebaseService()
