import {Timestamp} from 'firebase/firestore';

// export enum OrderDirection {
//   asc = 'asc',
//   desc = 'desc'
// }

export type InputTypes = 'letter' | 'word';
export type OrderDirections = 'asc' | 'desc';
export type Languages = 'ko' | 'en';

export interface ILevelInfo {
  id: string;
  title: string;
  order: number;
  levels: ILevel[];
}

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

export interface ILevelWithUserRecord extends ILevel {
  userRecord?: IUserTypingData;
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

export interface IHangulKeyData extends IKeyData {
  combinable: boolean;
}

export interface IKeyData {
  code: string;
  key: string;
  han: string;
  shiftKey: boolean;
}

export interface IBuffer {
  // id: string;
  typingText: string | string[];
}

export interface ILetter extends IBuffer {
  id: string;
  sampleText: string[];
  // typingText?: string[];
}

export interface IScoreData {
  accuracy: number;
  speed: number;
  duration: number;
  score: number;
  trophy: number;
}

export interface IUserTypingData extends IScoreData {
  id: string;
  userId: string | null | undefined;
  levelId: string;
  categoryId: string;
  keyInputList: IKeyInput[];
  createdAt: Timestamp | null;
}
