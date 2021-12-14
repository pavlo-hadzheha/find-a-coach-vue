import axios from 'axios';
import { ICoachRequest, ICoachResponse, CoachStore, CoachSkills } from '@/data-structures/coach';
import fb from '@/firebase';
import { Commit } from 'vuex';

export default {
  state(): CoachStore {
    return {
      coaches: [] as Array<ICoachResponse>,
      skills: Object.freeze({
        'frontend': 'bg-blue-400',
        'backend': 'bg-green-400',
        'career': 'bg-red-400'
      }) as CoachSkills,
    }
  },
  mutations: {
    refresh(state: CoachStore, payload: {coaches: Array<ICoachResponse>}): void {
      state.coaches = payload.coaches;
    },
    add(state: CoachStore, payload: {data: ICoachResponse}): void{
      console.log('Adding a coach')
      state.coaches.push(payload.data);
    },
    remove(state: CoachStore, payload: {coachID: string}): void{
      console.log('Removing a coach')
      const index = state.coaches.findIndex(c => c.UID === payload.coachID);
      state.coaches.splice(index, 1);
    },
  },
  actions: {
    getCoaches({commit, state}: {commit: Commit, state: CoachStore}): void {
      axios.get<ICoachResponse[]>(fb.API.coaches).then(data => {
        console.log(data)
      })
    }
  },
  getters: {
    skillOptions(state: CoachStore): CoachSkills {
      return state.skills;
    }
  }
}
