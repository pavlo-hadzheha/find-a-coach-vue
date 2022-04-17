import { IDialogMeta } from '@/types'
import { ICoachData } from './coach-data.interface'

export interface IUser {
  UID: string
  recordID?: string;
  firstName: string;
  lastName: string;
  email: string;
  isCoach: boolean;
  coachData: null | ICoachData;
  dialogs?: IDialogMeta[]
}
