import { createStore } from 'vuex'
import AuthModule from './AuthModule';
import MessageModule from './MessageModule';
import UserModule from './UserModule';


export default createStore({
  modules: {
    auth: AuthModule,
    messages: MessageModule,
    users: UserModule
  }
});
