
export interface CoachSkills {
  frontend: string;
  backend: string;
  career: string;
}

export interface ICoachSkill {
  readonly skill: keyof CoachSkills;
  readonly tagType: string;
}

export const skillOptions: Array<ICoachSkill> = [
  {skill: 'frontend', tagType: 'success' },
  {skill: 'backend', tagType: 'primary' },
  {skill: 'career', tagType: 'warning' },
];

