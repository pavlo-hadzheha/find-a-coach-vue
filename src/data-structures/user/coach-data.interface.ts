import { ICoachSkill } from "./coach-skills.interface";

export default interface CoachData {
  skills: Array<ICoachSkill>;
  hourlyRate: number;
  description: string;
}
