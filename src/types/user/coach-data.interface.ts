export interface ICoachSkills {
  frontend: string;
  backend: string;
  career: string;
}

export interface ICoachSkill {
  readonly skill: keyof ICoachSkills;
  readonly tagType: string;
}

export interface ICoachData {
  skills: Array<ICoachSkill>;
  hourlyRate: number;
  description: string;
}

export const skillOptions: Array<ICoachSkill> = [
  { skill: 'frontend', tagType: 'success' },
  { skill: 'backend', tagType: 'primary' },
  { skill: 'career', tagType: 'warning' }
]
