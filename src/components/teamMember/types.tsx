export interface ITeamMember {
  name: string;
  role: string;
  github: string;
  photo: string;
  bio: string;
}

export interface ITeamMembersProps {
  member: ITeamMember;
}
