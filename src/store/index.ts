import { createStore } from 'vuex'
import CoachModule from './CoachModule';
import RequestModule from './RequestModule';


export default createStore({
  modules: {
    CoachModule,
    RequestModule
  }
});
