export interface ILevel {
  groupId: string;
  groupTitle: string;
  title: string;
  subTitle: string;
  description: string;
  text: string;
  inputType: string;
  difficulty: string;
  language: string;
  levelId: string;
  writerUid: string | null;
  writerEmail: string | null;
  createDateTime: number | null;
  modifiedDateTime: number | null;
  order: number;
}

export interface ILevelListParams {
  groupId?: string;
  orderBy?: string;
}
