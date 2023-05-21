import {Timestamp} from 'firebase/firestore';

// export enum OrderDirection {
//   asc = 'asc',
//   desc = 'desc'
// }

export type InputTypes = 'letter' | 'word';
export type OrderDirections = 'asc' | 'desc';
export type Languages = 'ko' | 'en';

export interface ILevel {
  categoryId: string;
  categoryTitle: string;
  title: string;
  subTitle: string;
  description: string;
  text: string;
  inputType: InputTypes;
  difficulty: string;
  language: Languages;
  id: string;
  writerUid: string | null;
  writerEmail: string | null;
  createdAt: Timestamp | null;
  modifiedAt: Timestamp | null;
  order: number;
}

export interface ILevelListParams {
  categoryId?: string;
  orderBy?: string;
  orderDirection?: OrderDirections;
}

export interface IKeyInput {
  id: string;
  code: string;
  key: string;
  shiftKey: boolean;
  timestamp: Timestamp | null;
}

export interface IKeyData {
  code: string;
  key: string;
  han: string;
  shiftKey: boolean;
}

export interface ILetter {
  id: string;
  sampleText: string[];
  typingText?: string[];
}
