import { Firebase } from '@/data-structures/firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAFeAnAqKYZXPUc_IG2OP2I8Dt3nou8F6w",
  authDomain: "vue-course-346d6.firebaseapp.com",
  databaseURL: "https://vue-course-346d6-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "vue-course-346d6",
  storageBucket: "vue-course-346d6.appspot.com",
  messagingSenderId: "542227284121",
  appId: "1:542227284121:web:7060a2a4058b1d51687808"
};

function normalizedPath(path?: string): string {
  if(!path) return '';
  path = path.trim();
  path = path.endsWith('/') ? path.slice(0,-1) : path;
  path = path.startsWith('/') ? path.slice(1) : path;
  return path;
}

export default {
  API: {
    auth: {
      signIn: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseConfig.apiKey}`,
      signUp: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseConfig.apiKey}`
    },
      users(path = ''): string {
        const url = 'https://vue-course-346d6-default-rtdb.europe-west1.firebasedatabase.app/users';
        return `${url}${path ? '/' : ''}${normalizedPath(path)}.json`;
      },
      messages(path = ''): string {
        const url = 'https://vue-course-346d6-default-rtdb.europe-west1.firebasedatabase.app/messages';
        return `${url}${path ? '/' : ''}${normalizedPath(path)}.json`;
      },
      dialogs(path = ''): string {
        const url = 'https://vue-course-346d6-default-rtdb.europe-west1.firebasedatabase.app/dialogs';
        return `${url}${path ? '/' : ''}${normalizedPath(path)}.json`;
      }
  }
} as Firebase

