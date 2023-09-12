export interface ITeamMember {
  id: string;
  name: string;
  role: string;
  github: string;
  photo: string;
  bio: string;
  education: string[];
  skills: string;
  language: string;
}

export interface ITeamMembersProps {
  member: ITeamMember;
}
