import {DialogMeta} from '../dialog';
import CoachData from './coach-data.interface';

export interface IUser {
  UID: string
  recordID?: string;
  firstName: string;
  lastName: string;
  email: string;
  isCoach: boolean;
  coachData: null | CoachData;
  dialogs?: DialogMeta[]
}
