export interface CoachSkills {
  frontend: string;
  backend: string;
  career: string;
}

export interface ICoachResponse {
  UID: string;
  skills: Array<keyof CoachSkills>;
  hourlyRate: number | null;
  name: string;
}

export interface ICoachRequest {
  UID?: string;
  skills: Array<keyof CoachSkills>;
  hourlyRate: number | null;
  name: string;
}


export interface CoachStore {
  coaches: Array<ICoachResponse>
  skills: CoachSkills;
}

export default class Coach implements ICoachRequest {
  UID!: string;
  skills: Array<keyof CoachSkills>;
  hourlyRate: number;
  name: string;
  
  constructor( {UID, skills, hourlyRate, name}: ICoachRequest) { 
    if(UID) this.UID = UID;
    this.skills = skills;
    this.hourlyRate = hourlyRate;
    this.name = name;
  }
}
