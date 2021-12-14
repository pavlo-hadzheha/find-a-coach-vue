import {ActionContext} from 'vuex'
import axios from 'axios';
import fb from '@/firebase';
import { UserCredential } from 'firebase/auth';
import {
  createUserWithEmailAndPassword
} from 'firebase/auth';
import {ICoachRequest, ICoachResponse} from '@/data-structures/coach';

export default {
  actions: {
    async emailSignUp(
      ctx: ActionContext<any, any>, 
      payload: {coach: ICoachRequest,
                password: string, 
                email: string}): Promise<void> {
      const credential: UserCredential = await createUserWithEmailAndPassword(fb.auth, payload.email, payload.password);
      return await axios.post(fb.API.requests, {
          UID: credential.user.uid,
          ...payload.coach,
        });
    }
  }
}
