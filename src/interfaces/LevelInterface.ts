import {Timestamp} from 'firebase/firestore';

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
  createdAt: Timestamp | null;
  modifiedAt: Timestamp | null;
  order: number;
}

export interface ILevelListParams {
  groupId?: string;
  orderBy?: string;
}
